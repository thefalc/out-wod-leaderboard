'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');
var router = express.Router();
var fs = require("fs");
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var models = require('../models');
var athleteImporter = require('../util/athlete_importer');

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.get('/import', function (req, res) {
	athleteImporter.importAthletes();

	res.status(200).send("Worked!");
});

// gets all the athletes
router.get('/', function (req, res) {
	var page = req.query.page;
	var division = req.query.division;
	var standards = req.query.standards;
	var searchQuery = req.query.searchQuery;

	var limit = 10;

	var Op = Sequelize.Op;

	var conditions = { name: _defineProperty({}, Op.like, '%' + searchQuery + '%') };

	// handle cases where the querystring is missing values
	if (page == undefined) page = 1;

	if (division.indexOf(',') >= 0) {
		let divisions = division.split(',');
		conditions.division = divisions;
	}
	else if (division > 2) conditions.division = division;
	else if (division == 1) conditions.gender = 'M';
	else if (division == 2) conditions.gender = 'F';

	if (standards != 0) conditions.standards = standards;

	var offset = (page - 1) * limit;

	models.Athlete.findAndCountAll({
		limit: limit,
		offset: offset,
		distinct: true,
		order: [['overallrank', 'asc']],
		include: [{
			model: models.Score
		}],
		where: conditions
	}).then(function (athletes) {
		res.json({ response: { total: athletes.count, athletes: athletes.rows } });
	});
});

module.exports = router;