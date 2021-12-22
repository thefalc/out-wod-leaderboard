import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class AddScore extends Component {
	constructor() {
		super();

		this.state = {
			workoutId: "18.5"
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		let formData = this.state;

		axios.post('/athletes/addScore', {
			formData
		}).then(function (response) {
			if(response.data.response.result == "ok") {
				alert("You score has been added.");

				window.location.href = "/";
			}
		})
	  	.catch(error => {
		    console.log(error.response);
		});
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

  	render() {
	    return (
	      <div className="row">
	      	<div className="col-sm-6 col-sm-offset-3">
	      		<h2>Add Score for 18.5</h2>
	      		<div className="well">
	      			<form onSubmit={this.handleSubmit}>
	      				<div className="form-group row">
	      					<label className="col-sm-2">Email:</label>
	      					<input className="col-sm-4" placeholder="email@example.com" onChange={this.handleChange} type="text" name="email" />
	      				</div>

	      				<div className="form-group row">
	      					<label className="col-sm-2">Reps:</label>
	      					<input className="col-sm-2" placeholder="Total Reps" onChange={this.handleChange} type="text" name="reps" />
	      				</div>

	      				<div className="form-group row">
	      					<label className="col-sm-2">Time:</label>
	      					<input className="col-sm-2" placeholder="mm:ss" onChange={this.handleChange} type="text" name="time" />
	     				</div>

	      				<div className="form-group row">
	      					<label className="col-sm-2">Judge:</label>
	      					<input className="col-sm-4" placeholder="Name of Judge" onChange={this.handleChange} type="text" name="judge" />
	      				</div>

	      				<div className="form-group row">
	      					<label className="col-sm-2">Affiliate:</label>
	      					<input className="col-sm-4" placeholder="Name of Affiliate" onChange={this.handleChange} type="text" name="affiliate" />
	      				</div>

	      				<button className="btn btn-primary" type="submit">Submit</button>
	      			</form>
	      		</div>
	      	</div>
	      </div>
	    )
  	}
}

export default AddScore;