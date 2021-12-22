import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
*	Class for displaying an athlete's score for an open workout.
*/
class AthleteScore extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const hidden = this.props.hidden;

		const rank = getGetOrdinal(this.props.score.workoutrank);
		let scoreDisplay = this.props.score.scoredisplay;
		const breakdown = this.props.score.breakdown;
		const time = this.props.score.scoredisplay;
		const judge = this.props.score.judge;
		const judgeAffiliate = this.props.score.affiliate;
		const standards = this.props.standards;

		if(standards == 2 && scoreDisplay.indexOf("-s") < 0  && scoreDisplay.indexOf(" - s") < 0) {
			scoreDisplay += " -s";
		}

		let textStyle = {};
		if(!hidden) {
			textStyle = { fontWeight: 700 };
		}

		return (
			<div>
				<div style={textStyle}>{rank} ({scoreDisplay})</div>

				{!hidden && <ScoreAttributes breakdown={breakdown} time={time} judge={judge} judgeAffiliate={judgeAffiliate} />}
			</div>	
		)
	}
}

/**
*	Class for displaying a score's attributes.
*	These are only displayed when a user has clicked to view the details.
*/
class ScoreAttributes extends Component {
	render() {
		const breakdown = this.props.breakdown;
		const time = this.props.time;
		const judge = this.props.judge;
		const judgeAffiliate = this.props.judgeAffiliate;

		var s = { 
			display: 'block',
			width: '100%'
		};

		var itemStyle = {
			marginTop: '8px'
		}

		let judgeText = '';
		if(judge != '') {
			judgeText = 'Judged by ' + judge;
		}
		if(judgeAffiliate != '') {
			judgeText += ' at ' + judgeAffiliate + '.';
		}

		return (
			<div style={s} className="bottom">
				<div>{breakdown}</div>
				<div style={itemStyle}>({time})</div>
				<div style={itemStyle}>
					{judgeText}
				</div>
			</div>
		)
	}
}

/**
*	Converts a number into its ordinal value.	
*/
function getGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;

    return n + (s[(v - 20) %10] || s[v] || s[0]);
}

export default AthleteScore;