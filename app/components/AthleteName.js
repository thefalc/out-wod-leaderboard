import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
*	Class for displaying an athlete's name and attributes.
*/
class AthleteName extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const name = this.props.athlete.name;
		const profilePic = this.props.athlete.profilepic;
		const userId = this.props.athlete.userid;
		const countryName = this.props.athlete.countryoforiginname;
		const age = this.props.athlete.age;
		const height = this.props.athlete.height;
		const weight = this.props.athlete.weight;
		const hidden = this.props.hidden;

		let textStyle = {};
		let nameText = '+';
		if(!hidden) {
			textStyle = { fontWeight: 700 };
			nameText = '-';
		}

		return (
			<div>
				<div style={textStyle}>{nameText} {name}</div>

				{!hidden && <AthleteAttributes profilePic={profilePic} userId={userId} countryName={countryName} age={age} height={height} weight={weight} />}
			</div>	
		)
	}
}

/**
*	Class for displaying an athlete's attributes.
*	These are only displayed when a user has clicked to view the details.
*/
class AthleteAttributes extends Component {
	render() {
		let profilePic = this.props.profilePic;
		const userId = this.props.userId;
		let countryName = this.props.countryName;
		let age = this.props.age;
		let height = this.props.height;
		let weight = this.props.weight;

		console.log(userId);

		if(profilePic == "") {
			profilePic = "https://profilepicsbucket.crossfit.com/pukie.png";
		}

		if(age == 0) age = "";

		if(height != "") {
			height = height + " | " + weight;
		}
		else {
			height = "";
		}

		var s = { 
			flexFlow: 'row wrap',
			display: 'flex',
			alignItems: 'stretch'
		};

		var imgStyles = {
			width: '70px', 
			height: '70px',
			flexFlow: 'row wrap',
		}

		return (
			<div style={s} className="bottom">
				<img style={imgStyles} src={profilePic} />
				<ul className="list-unstyled">
					<li>{countryName}</li>
					<li>{age}</li>
					<li>{height}</li>
					{userId ? (<li><a href={'https://games.crossfit.com/athlete/' + userId} target="_blank">View Profile</a></li>) : ''}
					
				</ul>
			</div>
		)
	}
}

export default AthleteName;