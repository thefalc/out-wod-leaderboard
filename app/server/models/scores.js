'use strict';

module.exports = (sequelize, DataTypes) => {
  var Score = sequelize.define('Score', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    workoutrank: DataTypes.INTEGER,
    workoutresult: DataTypes.STRING,
    scoreidentifier: DataTypes.STRING,
    scoredisplay: DataTypes.STRING,
    time: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
    breakdown: DataTypes.STRING,
    judge: DataTypes.STRING,
    affiliate: DataTypes.STRING,
    createddate: DataTypes.DATE,
    athleteid: DataTypes.INTEGER,
    workoutid: DataTypes.STRING,
  },
  {
    tableName: 'scores'
  });

  return Score;
};
