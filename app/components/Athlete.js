import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AthleteName from './AthleteName';
import AthleteScore from './AthleteScore';

/**
*	Class for displaying an individual athlete.
*	This is a row in a table.
*/
class Athlete extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hidden: true
		}
	}

	toggleHidden () {
	    this.setState({
	    	hidden: !this.state.hidden
	    });
	  }

	render() {
		const hidden = this.state.hidden;

		const athlete = this.props.athlete;

		const name = athlete.name;
		const overallRank = athlete.overallrank;
		const overallScore = athlete.overallscore;
		const profilePic = athlete.profilepic;
		const userId = athlete.userid;
		const regionName = athlete.region;
		const age = athlete.age;
		const height = athlete.height;
		const weight = athlete.weight;

		let scores = athlete.Scores;

		scores.sort(scoreCompare);

		let missingPreScores = [];

		// if(scores.length > 0 && scores[0].workoutid != "18.1") {
		// 	missingPreScores.push(0);
		// }

		let missingScores = [];

		let workoutIds = ["19.1", "19.2", "19.3", "19.4", "19.5", "19.6"];
		let allScores = [];
		
		for(var i = 0; i < workoutIds.length; i++) {
			var found = false;
			for(var j = 0; j < scores.length; j++) {
				if(scores[j].workoutid == workoutIds[i]) {
					allScores.push(scores[j]);
					found = true;
					break;
				}
			}

			if(!found) {
				allScores.push({
					workoutrank: '--',
					scoredisplay: '--',
					breakdown: '--',
					scoredisplay: '--',
					judge: '--',
					affiliate: '--',
					standards: '--'
				});
			}
		}

		// this is to show a -- for entries without a score
		for(var i = 6 - missingPreScores.length; i > allScores.length; i--) {
			missingScores.push(i);
		}

		let textStyle = {};
		if(!hidden) {
			textStyle = { fontWeight: 700 };
		}

		// render name and attributes
		return (
			<tr onClick={this.toggleHidden.bind(this)} >
				<td className="highlight">{overallRank}</td>
				<td className="name">
					<AthleteName hidden={hidden} athlete={athlete} />
				</td>
				<td>
					<div style={textStyle}>{overallScore}</div>
				</td>
				{ missingPreScores.map((value) => 
					{
						return (
							<td className="hidden-xs" key={value}>--</td>
						)
					}
				)}
				{ allScores.map((score) => 
					{ 
						const scoreId = score.id;
						return (
							<td className="score hidden-xs" key={scoreId}>
								<AthleteScore hidden={hidden} standards={athlete.standards} score={score} />
							</td>
						)
					}
				)}
				{ missingScores.map((value) => 
					{
						return (
							<td className="hidden-xs" key={value}>--</td>
						)
					}
				)}
			</tr>
		)
	}
}

function scoreCompare(a, b) {
	if(a.workoutid == b.workoutid) return 0;

	if(a.workoutid == "19.1") return -1;
	if(b.workoutid == "19.1") return 1;

	if(a.workoutid == "19.2") return -1;
	if(b.workoutid == "19.2") return 1;

	if(a.workoutid == "19.3") return -1;
	if(b.workoutid == "19.3") return 1;

	if(a.workoutid == "19.4") return -1;
	if(b.workoutid == "19.4") return 1;

	if(a.workoutid == "19.5") return -1;
	if(b.workoutid == "19.5") return 1;

	if(a.workoutid == "19.6") return -1;
	if(b.workoutid == "19.6") return 1;

	return 1;
}

export default Athlete;