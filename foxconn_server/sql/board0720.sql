/*
Navicat MySQL Data Transfer

Source Server         : 172.16.4.20
Source Server Version : 80011
Source Host           : 172.16.4.20:3306
Source Database       : board0720

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2018-07-20 15:40:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `consume_statistic`
-- ----------------------------
DROP TABLE IF EXISTS `consume_statistic`;
CREATE TABLE `consume_statistic` (
  `id` int(11) NOT NULL,
  `total_consume_power` int(11) DEFAULT NULL,
  `total_consume_gas` int(11) DEFAULT NULL,
  `avg_consume_temperature` int(11) DEFAULT NULL,
  `avg_consume_humidity` int(11) DEFAULT NULL,
  `avg_consume_noise` int(11) DEFAULT NULL,
  `avg_consume_pm` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of consume_statistic
-- ----------------------------
INSERT INTO `consume_statistic` VALUES ('1', '45875', '15240', '25', '60', '65', '45', '1530288000');
INSERT INTO `consume_statistic` VALUES ('2', '48520', '16540', '28', '56', '50', '68', '1530374400');
INSERT INTO `consume_statistic` VALUES ('3', '47510', '18410', '39', '64', '65', '65', '1530460800');
INSERT INTO `consume_statistic` VALUES ('4', '47100', '15470', '28', '66', '67', '44', '1530547200');
INSERT INTO `consume_statistic` VALUES ('5', '46210', '12040', '28', '68', '75', '50', '1530633600');
INSERT INTO `consume_statistic` VALUES ('6', '42102', '12580', '30', '59', '58', '53', '1530720000');
INSERT INTO `consume_statistic` VALUES ('7', '40015', '10125', '30', '64', '65', '48', '1530806400');
INSERT INTO `consume_statistic` VALUES ('8', '35410', '9852', '27', '57', '65', '45', '1530892800');
INSERT INTO `consume_statistic` VALUES ('9', '42015', '11245', '26', '58', '59', '54', '1530979200');
INSERT INTO `consume_statistic` VALUES ('10', '45193', '15287', '26', '57', '65', '45', '1531065600');

-- ----------------------------
-- Table structure for `cur_env_record`
-- ----------------------------
DROP TABLE IF EXISTS `cur_env_record`;
CREATE TABLE `cur_env_record` (
  `id` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cur_env_record
-- ----------------------------

-- ----------------------------
-- Table structure for `line`
-- ----------------------------
DROP TABLE IF EXISTS `line`;
CREATE TABLE `line` (
  `id` int(11) NOT NULL,
  `factory_name` varchar(32) DEFAULT NULL,
  `product_name` varchar(32) DEFAULT NULL,
  `line_name` varchar(32) DEFAULT NULL,
  `order_no` varchar(32) DEFAULT NULL,
  `output_count` int(11) DEFAULT NULL,
  `input_count` int(11) DEFAULT NULL,
  `uph` int(11) DEFAULT NULL,
  `yield_rate` int(11) DEFAULT NULL,
  `first_pass_rate` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of line
-- ----------------------------
INSERT INTO `line` VALUES ('1', '北京富士康', '成品自動測試', 'line1', 'beifu201807090', '313273', '313273', '1675', '96', '90', '1532069092');
INSERT INTO `line` VALUES ('2', '北京富士康', 'SMT板測', 'line2', 'beifu201807091', '313273', '313273', '1675', '95', '90', '1532069092');

-- ----------------------------
-- Table structure for `material_logs`
-- ----------------------------
DROP TABLE IF EXISTS `material_logs`;
CREATE TABLE `material_logs` (
  `id` int(11) NOT NULL,
  `line_name` varchar(32) DEFAULT NULL,
  `material_no` varchar(32) DEFAULT NULL,
  `material_name` varchar(32) DEFAULT NULL,
  `material_count` int(11) DEFAULT NULL,
  `site_type` varchar(32) DEFAULT NULL,
  `site_no` varchar(32) DEFAULT NULL,
  `load_time` int(11) DEFAULT NULL,
  `blank_time` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `cell_name` varchar(32) DEFAULT NULL,
  `result` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of material_logs
-- ----------------------------

-- ----------------------------
-- Table structure for `record_count`
-- ----------------------------
DROP TABLE IF EXISTS `record_count`;
CREATE TABLE `record_count` (
  `id` int(11) NOT NULL,
  `line_name` varchar(32) DEFAULT NULL,
  `record_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of record_count
-- ----------------------------

-- ----------------------------
-- Table structure for `station`
-- ----------------------------
DROP TABLE IF EXISTS `station`;
CREATE TABLE `station` (
  `id` int(11) NOT NULL,
  `line_name` varchar(32) DEFAULT NULL,
  `station_no` varchar(32) DEFAULT NULL,
  `station_name` varchar(32) DEFAULT NULL,
  `station_type` varchar(32) DEFAULT NULL,
  `station_order` varchar(32) DEFAULT NULL,
  `first_pass_rate` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of station
-- ----------------------------

-- ----------------------------
-- Table structure for `tester`
-- ----------------------------
DROP TABLE IF EXISTS `tester`;
CREATE TABLE `tester` (
  `id` int(11) NOT NULL,
  `line_name` varchar(32) DEFAULT NULL,
  `order_no` varchar(32) DEFAULT NULL,
  `station_name` varchar(32) DEFAULT NULL,
  `tester_name` varchar(32) DEFAULT NULL,
  `total_count` int(11) DEFAULT NULL,
  `first_pass_rate` int(11) DEFAULT NULL,
  `yield_rate` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tester
-- ----------------------------

-- ----------------------------
-- Table structure for `tester1`
-- ----------------------------
DROP TABLE IF EXISTS `tester1`;
CREATE TABLE `tester1` (
  `id` int(11) NOT NULL,
  `line_name` varchar(255) DEFAULT NULL,
  `cell_name` varchar(255) DEFAULT NULL,
  `tester_name` varchar(255) DEFAULT NULL,
  `time_consuming` int(11) DEFAULT NULL,
  `first_pass_rate` int(11) DEFAULT NULL,
  `yield_count` int(11) DEFAULT NULL,
  `failure_count` int(11) DEFAULT NULL,
  `total_count` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tester1
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin123,!');
