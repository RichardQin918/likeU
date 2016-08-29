/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50624
 Source Host           : localhost
 Source Database       : test

 Target Server Type    : MySQL
 Target Server Version : 50624
 File Encoding         : utf-8

 Date: 04/26/2016 10:05:01 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `answer_table`
-- ----------------------------
DROP TABLE IF EXISTS `answer_table`;
CREATE TABLE `answer_table` (
  `AnswerID` text NOT NULL,
  `QuestionID` text DEFAULT NULL,
  `OpenID` text NOT NULL COMMENT 'openid for the owner',
  `Content` text DEFAULT '' COMMENT 'answers, comments, marks',
  PRIMARY KEY (`AnswerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
