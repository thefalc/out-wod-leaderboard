import gamesApi from '../util/games_api';
var models  = require('../models');
var Sequelize 	= require('sequelize');

var updateCutOff = new Date(); 

const Op = Sequelize.Op;

var methods = {
	importAthletes: function() {
		let that = this;

		for(let page = 1; page < 25; page++) {
			gamesApi.performRequest('/competitions/api/v1/custom-leaderboards/4b84f959ef651dc5bf25/leaderboards?time=' + new Date().getTime() + 'sort=0&page='+page, 'GET', 
				{},	
				function(data) {
					try {
						for(let i = 0; i < data.leaderboardRows.length; i++) {
							that.updateAthleteScores(data.leaderboardRows[i], data.leaderboardRows.length);
						}
						that.rerankAllAthletes();
					} catch(e) {
						console.log(e);
					}
				}
			);
		}
	},

	rerankAllAthletes: function() {
		let that = this;

		// athletes updated, process ranks
		models.Athlete.findAll({
				include: [
			        {
			          model: models.Score
			        }
			      ]
			})
			.then(athletes => {
		    	that.rankAthletes(athletes);
			});	
	},

	rankAthletes: function(athletes) {
		let workoutIds = ["19.1", "19.2", "19.3", "19.4", "19.5", "19.6"];
		// sort by each workout and calculate the rank for the workout
		for(var i = 0; i < workoutIds.length; i++) {
			athletes.sort(propComparator(workoutIds[i]));
			this.updateAthleteRanks(athletes, workoutIds[i]);
		}

		// calculate athletes overall score
		for(let i = 0; i < athletes.length; i++) {
			let score = 0;
			for(let j = 0; j < athletes[i].dataValues.Scores.length; j++) {
				score += athletes[i].dataValues.Scores[j].dataValues.workoutrank;
			}

			// athlete has missing scores, give them the worse rank possible
			let diff = workoutIds.length - athletes[i].dataValues.Scores.length;
			score += (diff * athletes.length);

			athletes[i].dataValues.overallscore = score;
		}

		console.log("UPDATING OVERALL RANKS");

		// sort by score and save score and rank
		athletes.sort(scoreCompare);
		for(let i = 0; i < athletes.length; i++) {
			let rank = i + 1;
			let score = athletes[i].dataValues.overallscore;

			models.Athlete.findById(athletes[i].dataValues.id).then(athlete => {
			  athlete.update({overallscore: score, overallrank: rank});
			});
		}
	},

	updateAthleteRanks: function(athletes, workoutId) {
		console.log("UPDATING ATHLETE RANKS FOR WORKOUTS");

		for(var i = 0; i < athletes.length; i++) {
			var workoutIndex = -1;
			// find the correct workout
			for(var j = 0; j < athletes[i].dataValues.Scores.length; j++) {
				if(athletes[i].dataValues.Scores[j].dataValues.workoutid == workoutId) {
					workoutIndex = j;
					break;
				}
			}
			
			// workout exists, update the rank
			if(workoutIndex > -1) {
				let scoreData = athletes[i].dataValues.Scores[workoutIndex].dataValues;

				// set the workout rank
				scoreData.workoutrank = i + 1;

				let athleteId = athletes[i].dataValues.id;
				let scoreIdentifier = scoreData.scoreidentifier;

				this.upsertScore(scoreData, {athleteid : athleteId, workoutid: workoutId});
			}
		}
	},

	// need to update the db with the latest scores
	updateAthleteScores: function(liveData, totalAthletes) {
		var athleteObj = {
			id: liveData.entrant.competitorId,
			userid: liveData.entrant.competitorId,
			name: liveData.entrant.competitorName,
			age: liveData.entrant.age,
			height: liveData.entrant.height,
			weight: liveData.entrant.weight,
			countryoforiginname: liveData.entrant.countryOfOriginName,
			countryoforigincode: liveData.entrant.countryOfOriginCode,
			division: liveData.entrant.divisionId,
			divisionid: liveData.entrant.divisionId,
			overallrank: liveData.overallRank,
			overallscore: liveData.overallScore,
			gender: liveData.entrant.gender,
			affiliateid: liveData.entrant.affiliateId,
			affiliate: liveData.entrant.affiliateName,
			regionid: 0,
			standards: 1,
			profilepic: "https://profilepicsbucket.crossfit.com/" + liveData.entrant.profilePicS3key,
			lastupdated: new Date()
		};

		var athleteId = liveData.entrant.competitorId;

  		let workoutIds = ["19.1", "19.2", "19.3", "19.4", "19.5"];
  		let maxReps = [0, 430, 180, 132, 210];
  		let scaled = 1;
  		let totalScaled = 0;

  		// go over all scoring data and create/update the records
	 	for(var i = 0; i < liveData.scores.length; i++) {
	 		// if(workoutIds[i] != "19.5") continue; 

	 		var scoreData = liveData.scores[i];
	 		let reps = maxReps[i];

	 		if(scoreData.scaled == "1") {
	 			scaled = 2;
	 			totalScaled++;
	 		}

	 		// we have a rep-based score
	 		let index = scoreData.scoreDisplay.indexOf("reps");
	 		if(index >= 0) {
	 			reps = parseInt(scoreData.scoreDisplay);
	 		}

	 		index = scoreData.scoreDisplay.indexOf("lb");
	 		if(index >= 0) {
	 			reps = parseInt(scoreData.scoreDisplay);
	 		}

	 		index = scoreData.scoreDisplay.indexOf("lbs");
	 		if(index >= 0) {
	 			reps = parseInt(scoreData.scoreDisplay);
	 		}

	 		// no data for entry
	 		if(scoreData.scoreDisplay == '' && (scoreData.time == undefined || scoreData.time == 0)) {
	 			continue;
	 		}

	 		var obj = {
	 			workoutid: workoutIds[i],
	 			workoutrank: scoreData.rank,
	 			workoutresult: reps,
	 			scoreidentifier: scoreData.scoreIdentifier,
	 			scoredisplay: scoreData.scoreDisplay,
	 			time: scoreData.time == undefined ? 0 : scoreData.time,
	 			reps: reps,
	 			breakdown: scoreData.breakdown == undefined ? "" : scoreData.breakdown,
	 			judge: scoreData.judge == undefined ? "" : scoreData.judge,
	 			affiliate: scoreData.affiliate == undefined ? "" : scoreData.affiliate,
	 			athleteid: athleteId
	 		};

	 		this.upsertScore(obj, {athleteid : athleteId, workoutid: workoutIds[i]});
	 	}

	 	if(liveData.scores.length == 0) {
  			athleteObj.overallrank = totalAthletes;
  		}

	 	athleteObj.standards = scaled;

	 	this.upsertAthlete(athleteObj, {id : athleteId});
	},

	deleteAllAthletes: function() {
		models.Athlete.destroy({
			where: {},
  			truncate: true
		});
	},

	deleteAllScores: function() {
		models.Score.destroy({
			where: {},
  			truncate: true
		});
	},

	// updates existing record or inserts new one
	upsertScore: function(values, condition) {
	    return models.Score
	        .findOne({ where: condition })
	        .then(function(obj) {
	            if(obj) { // update
	                return obj.update(values);
	            }
	            else { // insert
	                return models.Score.create(values);
	            }
	        }
	    );
	},

	// updates existing record or inserts new one
	upsertAthlete: function(values, condition) {
	    return models.Athlete
	        .findOne({ where: condition })
	        .then(function(obj) {
	            if(obj) { // update
	                return obj.update(values);
	            }
	            else { // insert
	                return models.Athlete.create(values);
	            }
	        }
	    );
	},
}

// general function for sorting workouts by reps and then by time
function propComparator(prop) {
	return function(a, b) {
		let a1 = false;
		for(var i = 0; i < a.dataValues.Scores.length; i++) {
			if(a.dataValues.Scores[i].dataValues.workoutid == prop) {
				a1 = a.dataValues.Scores[i].dataValues;
				break;
			}
		}

		let b1 = false;
		for(var i = 0; i < b.dataValues.Scores.length; i++) {
			if(b.dataValues.Scores[i].dataValues.workoutid == prop) {
				b1 = b.dataValues.Scores[i].dataValues;
				break;
			}
		}

		// both athletes have a score
		if(a1 && b1) {
			// both meet the same standard, compare by reps and time
			if(a.dataValues.standards == b.dataValues.standards) {
				if(a1.reps > b1.reps) return -1;
				else if(a1.reps < b1.reps) return 1;
				else if(a1.time > b1.time) return 1;
				else if(a1.time < b1.time) return -1;

				return 0;
			} // sort by standards
			else if(a.dataValues.standards < b.dataValues.standards) return -1;
			else if(a.dataValues.standards > b.dataValues.standards) return 1;

			return 0;
		}
		else if(a1) return -1;
		else if(b1) return 1;

		return 0;
	}
}

function scoreCompare(a, b) {
	return a.dataValues.overallscore - b.dataValues.overallscore;
}

module.exports = methods;

