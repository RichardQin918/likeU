/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 01/04/16
 Time: 10:43 AM
 Desc: 绑定关系代理类
 */
'use strict';
var Bind = require('../models/bind');
var Logger = require('../logger');
var Error = require('../common/error');
var sequelize = require('../models/schema').schema();
/**
 * 根据DeviceId获取设备相关信息
 * @param  {string}   deviceId   设备ID
 * @param  {Function} callback callback function
 * @return {null}
 */
exports.retrieveByDeviceId= function (deviceId, callback) {
    Logger.info("/proxy/bind/retrieveD");
    //请求参数异常
    if (deviceId === 'undefined') {
        return callback(new InvalidParamError(), null);
    }

    Bind.build().retrieve(deviceId, function (data) {
        if(data)
            callback(null, data);
        else
            callback(null, new DataNotFoundError());
    },function(){
        callback(new DBError(), null);
    });
};

/**
 * 根据OpenId获取设备相关信息
 * @param  {string}   openId   设备ID
 * @param  {Function} callback callback function
 * @return {null}
 */
exports.retrieveByOpenId= function (openId, callback) {
    Logger.info("/proxy/bind/retrieveByOpenId");
    //请求参数异常
    if (openId === 'undefined') {
        return callback(new InvalidParamError(), null);
    }

    Bind.build().retrieve(openId, function (data) {
        if(data)
            callback(null, data);
        else
            callback(null, new DataNotFoundError());
    },function(){
        callback(new DBError(), null);
    });
};
/**
 * 保存绑定设备信息
 * @param  {object}   jsonData   用户提交参数
 * @param  {Function} callback callback function
 * @return {null}
 */
exports.saveDevice = function (jsonData, callback) {
    Logger.info("/proxy/bind/saveDevice");
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    Bind.build().add(jsonData, function (data) {
        callback(null, data);
    },function(){
        callback(new DBError(), null);
    });
};

