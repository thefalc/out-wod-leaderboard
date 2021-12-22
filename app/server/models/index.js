'use strict';

// db imports
var fs        	= require('fs');
var path      	= require('path');
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config.json')[env];
var Sequelize 	= require('sequelize');

// reference to this file so we don't import it as a model
const basename  = path.basename(module.filename);

// reference to db object that we will export
var db = {};

// create mysql connection based on our json configuration file and environment
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// load all our model files ans associate with our db
fs
 	.readdirSync(__dirname)
  	.filter((file) => {
    	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  	})
  	.forEach((file) => {
    	const model = sequelize['import'](path.join(__dirname, file));
    	db[model.name] = model;
	}
);

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
    	db[modelName].associate(db);
  	}
}); 

db.Athlete.hasMany(db.Score);

// connect to the db
sequelize
  	.authenticate()
  	.then(() => {
    	console.log('Connection has been established successfully.');
  	})
  	.catch(err => {
    	console.error('Unable to connect to the database:', err);
  	}
); 	

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
