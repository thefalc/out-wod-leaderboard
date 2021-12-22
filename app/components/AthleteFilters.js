import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
*	Class for displaying the leaderboard filters.
*/
class AthleteFilters extends Component {
	render() {
		let divisions = [ {id: 0, label: "OPEN+"}, {id: 2, label: "Women"}, {id: 1, label: "Men"}, 
			{id: '18,19', label: "OPEN+ 35-39"}, {id: 18, label: "Men's 35-39"}, {id: 19, label: "Women's 35-39"},
			{id: '12,13', label: "OPEN+ 40-44"}, {id: 12, label: "Men's 40-44"}, {id: 13, label: "Women's 40-44"},
			{id: '3,4', label: "OPEN+ 45-49"}, {id: 3, label: "Men's 45-49"}, {id: 4, label: "Women's 45-49"},
			{id: '5,6', label: "OPEN+ 50-54"}, {id: 5, label: "Men's 50-54"}, {id: 6, label: "Women's 50-54"},
			{id: '7,8', label: "OPEN+ 55-59"}, {id: 7, label: "Men's 55-59"}, {id: 8, label: "Women's 55-59"},
			{id: '9,10', label: "OPEN+ 60+"}, {id: 9, label: "Men's 60+"}, {id: 10, label: "Women's 60+"},
			{id: '16,17', label: "OPEN+ 16-17"}, {id: 16, label: "Men's 16-17"}, {id: 17, label: "Women's 16-17"},
			{id: '14,15', label: "OPEN+ 14-15"}, {id: 14, label: "Men's 14-15"}, {id: 15, label: "Women's 14-15"},];
		
		let workoutTypes = [ {id: 0, label: "Any"}, {id: 1, label: "Rx"}, {id: 2, label: "Scaled"}];

		const s = {
			padding: '10px 20px'
		};

		return (
			<div style={s}>
				<div className="pull-left">
					<label>Search</label>
					<div >
						<input type='text' placeholder='Athlete name' name='name' onChange={this.props.submitHandler} />
					</div>
				</div>
				<div className="pull-left">
					<label>Division</label>
					<div >
						<select onChange={this.props.changeHandler}>
							{ divisions.map((division) => 
								{
									return (
										<option value={division.id} key={division.id}>{division.label}</option>
									)
								}
							)}
						</select>
					</div>
				</div>
				<div className="pull-left">
					<label>Type</label>
					<div>
						<select onChange={this.props.standardsHandler}>
							{ workoutTypes.map((type) => 
								{
									return (
										<option value={type.id} key={type.id}>{type.label}</option>
									)
								}
							)}
						</select>
					</div>
				</div>		

				<div className="clearfix"></div>
			</div>
		)
	}
}

export default AthleteFilters;