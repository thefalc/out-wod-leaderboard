import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import AthleteTable from './AthleteTable';
import AthleteFilters from './AthleteFilters';

/**
*	Container for the athlete table and paging component.
*/
class Leaderboard extends Component {
	constructor() {
		super();

		this.state = {
			athletes: [],
			activePage: 1,
			totalItems: 0,
			division: 0,
			standards: 0,
			searchQuery: ''
		}

		// bind class to event handlers
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleFilterEvent = this.handleFilterEvent.bind(this);
		this.handleStandardsFilterEvent = this.handleStandardsFilterEvent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.initAthletePage(this.state.activePage);
	}

	handlePageChange(pageNumber) {
	    this.setState({ activePage: pageNumber });
	    this.initAthletePage(pageNumber);
	}

	handleSubmit(event) {
		//if(event.keyCode === 13) {
			let query = event.target.value;

			this.setState({ activePage: 1, searchQuery: query }, function() {
				this.initAthletePage(1);
			});
		//}
	}

	handleFilterEvent(event) {
		let division = event.target.value;

		this.setState({ activePage: 1, division: division }, function() {
			this.initAthletePage(1);
		});
	}

	handleStandardsFilterEvent(event) {
		let standards = event.target.value;

		this.setState({ activePage: 1, standards: standards }, function() {
			this.initAthletePage(1);
		});
	}

	/**
	*	Grabs the athletes matching the current page.
	*/
	initAthletePage(page) {
		var that = this;

		let division = this.state.division;
		let standards = this.state.standards;
		let searchQuery = this.state.searchQuery;

		axios.get('/athletes?page='+page+'&division='+division+'&standards='+standards+'&searchQuery='+searchQuery)
			.then(function (response) {
			    that.setState(
			    	{ athletes: response.data.response.athletes,
			    	  totalItems:  response.data.response.total
			    	}
			    );
			})
		  	.catch(function (error) {
		    	console.log(error);
		  	}
	  	);
	}

	render() {	
		return (
			<div>
				<AthleteFilters submitHandler={this.handleSubmit} standardsHandler={this.handleStandardsFilterEvent} changeHandler={this.handleFilterEvent} />
				<AthleteTable athletes={this.state.athletes} />
				<center>
					<Pagination
			          activePage={this.state.activePage}
			          itemsCountPerPage={10}
			          totalItemsCount={this.state.totalItems}
			          pageRangeDisplayed={5}
			          onChange={this.handlePageChange}
			        />
			    </center>
			</div>
		)
	}
}

export default Leaderboard;