/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : gradem

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2021-11-08 12:00:51
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `cno` char(5) NOT NULL,
  `cname` varchar(20) NOT NULL,
  PRIMARY KEY (`cno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('c01', '数据库');
INSERT INTO `course` VALUES ('c02', '数学');
INSERT INTO `course` VALUES ('c03', '\n信息工程');
INSERT INTO `course` VALUES ('c04', '操作系统');

-- ----------------------------
-- Table structure for `sc`
-- ----------------------------
DROP TABLE IF EXISTS `sc`;
CREATE TABLE `sc` (
  `sno` char(10) NOT NULL,
  `cno` char(5) NOT NULL,
  `degree` decimal(4,1) DEFAULT NULL,
  PRIMARY KEY (`sno`,`cno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of sc
-- ----------------------------
INSERT INTO `sc` VALUES ('2005010101', 'c01', '92.0');
INSERT INTO `sc` VALUES ('2005010101', 'c02', '85.0');
INSERT INTO `sc` VALUES ('2005010101', 'c03', '88.0');
INSERT INTO `sc` VALUES ('2005020201', 'c02', '90.0');
INSERT INTO `sc` VALUES ('2005020201', 'c03', '80.0');

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `sno` char(10) NOT NULL,
  `sname` varchar(8) DEFAULT NULL,
  `ssex` char(2) DEFAULT NULL,
  `sbirthday` date DEFAULT NULL,
  `saddress` varchar(50) DEFAULT NULL,
  `sdept` char(16) DEFAULT NULL,
  `speciality` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('2005010101', '王小鹏', '女', '2008-09-12', '河北省', '软件工程系', '信息管理');
INSERT INTO `student` VALUES ('2005010102', '张小鹏', '男', '2009-01-24', '海南省', '软件工程系', '软件开发');
INSERT INTO `student` VALUES ('2005010201', '刘一', '女', '2008-12-03', '重庆市', '计算机工程系', '计算机');
INSERT INTO `student` VALUES ('2005010202', '李四', '女', '2009-01-20', '河南省', '计算机工程系', '计算机');
INSERT INTO `student` VALUES ('2005020201', '王五', '男', '2009-03-11', '北京市', '管理系', '行政管理');
INSERT INTO `student` VALUES ('2005020202', '张三', '男', '2006-07-13', '山东省', '管理系', '电子商务');

-- ----------------------------
-- Table structure for `teacher`
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `tno` char(3) NOT NULL,
  `tname` varchar(8) DEFAULT NULL,
  `tsex` char(2) DEFAULT NULL,
  `tbirthday` date DEFAULT NULL,
  `tdept` char(16) DEFAULT NULL,
  PRIMARY KEY (`tno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('101', '李新', '男', '1977-01-12', '计算机工程系');
INSERT INTO `teacher` VALUES ('102', '钱军', '女', '1968-06-04', '计算机工程系');
INSERT INTO `teacher` VALUES ('201', '王小花', '女', '1979-12-23', '信息工程系');
INSERT INTO `teacher` VALUES ('202', '张小青', '男', '1968-08-25', '信息工程系');

-- ----------------------------
-- Table structure for `teaching`
-- ----------------------------
DROP TABLE IF EXISTS `teaching`;
CREATE TABLE `teaching` (
  `cno` char(5) NOT NULL,
  `tno` char(3) NOT NULL,
  `cterm` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`cno`,`tno`),
  KEY `tno_fk` (`tno`),
  CONSTRAINT `cno_fk` FOREIGN KEY (`cno`) REFERENCES `course` (`cno`),
  CONSTRAINT `tno_fk` FOREIGN KEY (`tno`) REFERENCES `teacher` (`tno`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of teaching
-- ----------------------------
INSERT INTO `teaching` VALUES ('c01', '101', '2');
INSERT INTO `teaching` VALUES ('c02', '102', '1');
INSERT INTO `teaching` VALUES ('c03', '201', '3');
INSERT INTO `teaching` VALUES ('c04', '202', '4');
