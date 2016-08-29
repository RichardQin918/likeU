
CREATE DATABASE Weixiangji;
USE Weixiangji;

DROP TABLE IF EXISTS `dt_users`;
CREATE TABLE `dt_users` (
  `ID` int NOT NULL auto_increment,
  `PASSWORD` varchar(255) DEFAULT NULL COMMENT '用户密码待扩展',
  `MOBILE` varchar(255) DEFAULT NULL COMMENT '用户移动电话',
  `AVATAR` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `NAME` varchar(255) DEFAULT NULL COMMENT '用户姓名',
  `USER_NAME` varchar(255) NOT NULL COMMENT '用户昵称',
  `SEX` int(1)  DEFAULT NULL COMMENT '性别：1男，2女',
  `EMAIL` varchar(255) DEFAULT NULL COMMENT '电子邮箱',
  `ADDRESS` varchar(255) DEFAULT NULL COMMENT '常用位置',
  `OPEN_ID` varchar(255) NOT NULL COMMENT '微信用户身份标示',
  `UNION_ID` varchar(255) DEFAULT NULL COMMENT '微信用户身份全局唯一标示',
  `POSITION` varchar(255) DEFAULT NULL COMMENT '最近一次位置',
  `DEVICE_ID` varchar(255)  NULL COMMENT '设备ID',
  `DEVICE_PERMISSION` int(1) DEFAULT 0 COMMENT '设备权限，默认为0，1为拥有者，2为分享者',
  `CITY` varchar(255) DEFAULT NULL COMMENT '城市',
  `PROVINCE` varchar(255) DEFAULT NULL COMMENT '省份',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建时间',
  `MODIFY_DATE` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `dt_feedbacks`;
CREATE TABLE `dt_feedbacks` (
  `ID` int  NOT NULL auto_increment,
  `CONTENT` varchar(255) DEFAULT NULL COMMENT '用户反馈内容',
  `CONTACT` varchar(255) DEFAULT NULL COMMENT '意见反馈联系方式',
  `CREATOR` varchar(255) DEFAULT NULL COMMENT '意见反馈人',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建时间',
  `MODIFY_DATE` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `dt_redpacks`;
CREATE TABLE `dt_redpacks`(
  `ID` int NOT NULL auto_increment,
  `KEY` varchar(255) NOT NULL COMMENT '红包口令',
  `FEE` decimal(5,2) DEFAULT 0 COMMENT '红包金额',
  `REDPACK_TYPE` varchar(255) NOT NULL COMMENT '支付宝口令红包或微信红包,0:为支付宝，1：为微信',
  `OPEN_ID` varchar(255) DEFAULT NULL COMMENT '客户微信ID',
  `DESCRIPTION` text DEFAULT NULL COMMENT '红包用途描述',
  `IS_USE` int(1) DEFAULT 0 COMMENT '是否已发放,0：未发放，1：已发放，默认0',
  `STATUS` int(1) DEFAULT 0 COMMENT '0：正常，1：超时，默认为：0，一般24小时认为超时',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建时间',
  `MODIFY_DATE` datetime DEFAULT NULL COMMENT '修改时间',
   PRIMARY KEY (`ID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `dt_shares`;
CREATE TABLE `dt_shares`(
  `ID` int NOT NULL auto_increment,
  `OPEN_ID` varchar(255) NOT NULL COMMENT '主动分享微信ID',
  `BEOPEN_ID` varchar(255) DEFAULT NULL COMMENT '被分享微信ID',
  `IMG_URL` varchar(255) DEFAULT NULL COMMENT '分享图片路径',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建时间',
  `MODIFY_DATE` datetime DEFAULT NULL COMMENT '修改时间',
   PRIMARY KEY (`ID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `dt_devices`;
CREATE TABLE `dt_devices`(
  `ID` int NOT NULL auto_increment,
  `DEVICE_TYPE` varchar(255)  NULL COMMENT '设备型号',
  `DEVICE_NAME` varchar(255)  NULL COMMENT '设备名称',
  `DEVICE_ID`   varchar(255) NOT NULL COMMENT '设备ID',
  `DEVICE_LICENCE`  varchar(255) NOT NULL COMMENT '设备证书',
  `QR_TICKET`  varchar(255) NOT NULL COMMENT '设备二维码生产串',
  `MAC`  varchar(255)  NULL COMMENT '设备的MAC地址',
  `CREATE_DATE` datetime DEFAULT NULL COMMENT '创建时间',
  `MODIFY_DATE` datetime DEFAULT NULL COMMENT '修改时间',
   PRIMARY KEY (`ID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;





