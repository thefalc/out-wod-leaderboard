import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Athlete from './Athlete';

/**
*	Creates the leaderboard table header and maps each athlete
*	for the table body to an Athlete component.
*/
class AthleteTable extends Component {
	render() {
		const athletes = this.props.athletes;

		let noResultsText = "";
		if(athletes.length == 0) {
			noResultsText = "Sorry, no matching results.";
		}

		// print list of athletes
		return (
			<table className="table athlete-table table-striped table-bordered table-responsive">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Name</th>
						<th>Points</th>
						<th className="hidden-xs">19.1</th>
						<th className="hidden-xs">19.2</th>
						<th className="hidden-xs">19.3</th>
						<th className="hidden-xs">19.4</th>
						<th className="hidden-xs">19.5</th>
						<th className="hidden-xs">19.6</th>
					</tr>
				</thead>
				<tbody>
					{ athletes.map((athlete) => 
						{ 
							return (
								<Athlete key={athlete.id} athlete={athlete} />
							)
						}
					)}
					{noResultsText ? <tr><td colSpan='9'>{noResultsText}</td></tr> : ''}
				</tbody>
			</table>
		)
	}
}

export default AthleteTable;