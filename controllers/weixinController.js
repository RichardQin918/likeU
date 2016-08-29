/*
 Created with Sublime Text 2.
 User: mengpeng
 Date: 01/11/16
 Time: 10:30 AM
 Desc: 微信业务逻辑控制器
 */
"use strict";
//微信公共平台自动回复消息接口服务中间件
var resUtil = require("../utils/ResUtil");
var wxapi = require('../utils/wxapi');
var weixin = require('../proxy/redpack');
var fs = require("fs");
var resultConfig = require("../config").initConfig();
var logger = require("../logger");
var config = require('config');
var request = require("request");


/**
 * 自定义微信菜单
 * @return {null}
 */
exports.wxCreateMenu = function () {
    logger.info("/controllers/weixinController/wxCreateMenu");
    wxapi.createWxMenu();
};
/**
 *  微信给特定用户发送消息接口
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.wxSendText = function (req, res) {
    logger.info("/controllers/weixinController/wxSendText");

    var data = req.body.data || "";
    data = data.trim();
    logger.info("客户端请求参数：" + data);
    var jsonData = JSON.parse(data);

    wxapi.sendText(jsonData, function (err, data) {
        if (err) {
            logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
            return res.send(resUtil.generateRes(null, err.statusCode, err.message));
        }
        logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
        res.send(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
    });
};
/**
 *  获取公众号关注用户信息接口
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @return {null}
 */
exports.wxGetFollowers = function (req, res) {
    logger.info("/controllers/weixinController/wxGetFollowers");

    var data = req.body.data || "";
    data = data.trim();
    logger.info("客户端请求参数：" + data);
    var jsonData = JSON.parse(data);

    wxapi.wxGetFollowers(jsonData, function (err, data) {
        if (err) {
            logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
            return res.send(resUtil.generateRes(null, err.statusCode, err.message));
        }
        logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
        res.send(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
    });
};

/**
 *  获取将url转化为短链接
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @return {null}
 */
exports.wxShorturl = function (req, res) {
    logger.info("/controllers/weixinController/wxShorturl");

    var data = req.body.data || "";
    data = data.trim();
    logger.info("客户端请求参数：" + data);
    var jsonData = JSON.parse(data);

    wxapi.wxShorturl(jsonData, function (err, data) {
        if (err) {
            logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
            return res.send(resUtil.generateRes(null, err.statusCode, err.message));
        }
        logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
        res.send(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
    });
};

/**
 * 发送支付宝红包口令密码
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @return {null}
 */
exports.wxSendRedpackKey = function (req, res) {
    logger.info("/controllers/weixinController/wxSendRedpackKey");

    var data = req.body.data || "";
    data = data.trim();
    logger.info("客户端请求参数：" + data);
    var jsonData = JSON.parse(data);

    weixin.sendRedpackKey(jsonData, function (err, data) {
        if (err) {
            logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
            return res.send(resUtil.generateRes(null, err.statusCode, err.message));
        }
        logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
        res.send(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
    });
};


/**
 * 通过商户账号发送红包给用户
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @return {null}
 */
exports.wxSendRedpack = function (req, res) {
    logger.info("/controllers/weixinController/wxSendRedpack");

    var data = req.body.data || "";
    data = data.trim();
    logger.info("客户端请求参数：" + data);
    var jsonData = JSON.parse(data);

    weixin.sendRedpack(jsonData, function (err, data) {
        if (err) {
            logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
            return res.send(resUtil.generateRes(null, err.statusCode, err.message));
        }
        logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
        res.send(resUtil.generateRes(data, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
    });
};

/**
 * 给关注用户推送消息
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @return {null}
 */
exports.wxPushMessage = function () {
    logger.info("/controllers/weixinController/wxPushMessage");
};