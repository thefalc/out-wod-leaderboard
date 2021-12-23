/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Version : 50145
 Source Host           : localhost
 Source Database       : out_wod_2019

 Target Server Version : 50145
 File Encoding         : utf-8

 Date: 12/22/2021 13:20:42 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `athletes`
-- ----------------------------
DROP TABLE IF EXISTS `athletes`;
CREATE TABLE `athletes` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `regionid` int(11) NOT NULL,
  `divisionid` int(11) NOT NULL,
  `highlight` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `region` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `profilepic` varchar(255) NOT NULL,
  `overallrank` int(11) NOT NULL,
  `overallscore` int(11) NOT NULL,
  `affiliateid` int(11) NOT NULL,
  `affiliate` varchar(255) NOT NULL,
  `division` int(11) NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastupdated` timestamp NULL DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `standards` int(11) NOT NULL,
  `countryoforiginname` varchar(255) NOT NULL,
  `countryoforigincode` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `created_date` (`createddate`),
  KEY `last_updated` (`lastupdated`),
  KEY `email` (`email`),
  KEY `standards` (`standards`),
  KEY `divisionid` (`divisionid`),
  KEY `name` (`name`),
  KEY `userid` (`userid`),
  KEY `gender` (`gender`)
) ENGINE=MyISAM AUTO_INCREMENT=442 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `scores`
-- ----------------------------
DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workoutrank` int(11) NOT NULL,
  `workoutresult` varchar(100) NOT NULL,
  `scoreidentifier` varchar(100) NOT NULL,
  `scoredisplay` varchar(50) NOT NULL,
  `time` int(11) NOT NULL,
  `breakdown` varchar(255) NOT NULL,
  `judge` varchar(100) NOT NULL,
  `affiliate` varchar(100) NOT NULL,
  `athleteid` int(11) NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `workoutid` varchar(10) NOT NULL,
  `reps` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `scoreidentifier` (`scoreidentifier`),
  KEY `workoutrank` (`workoutrank`),
  KEY `time` (`time`),
  KEY `athleteid` (`athleteid`),
  KEY `createddate` (`createddate`),
  KEY `workoutid` (`workoutid`),
  KEY `reps` (`reps`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
