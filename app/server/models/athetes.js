'use strict';

module.exports = (sequelize, DataTypes) => {
  var Athlete = sequelize.define('Athlete', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    affiliateid: DataTypes.INTEGER,
    divisionid: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    countryoforiginname: DataTypes.STRING,
    countryoforigincode: DataTypes.STRING,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    profilepic: DataTypes.STRING,
    overallrank: DataTypes.INTEGER,
    overallscore: DataTypes.INTEGER,
    affiliate: DataTypes.STRING,
    division: DataTypes.INTEGER,
    lastupdated: DataTypes.DATE,
    standards: DataTypes.INTEGER,
    gender: DataTypes.STRING,
  },
  {
    tableName: 'athletes'
  });

  return Athlete;
};