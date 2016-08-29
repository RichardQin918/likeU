/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 01/04/16
 Time: 10:43 AM
 Desc: 用户设备代理类
 */
'use strict';
var Device = require('../models/device');
var Logger = require('../logger');
var Error = require('../common/error');
var sequelize = require('../models/schema').schema();
/**
 * 根据openId获取设备相关信息
 * @param  {string}   openId   意见ID
 * @param  {Function} callback callback function
 * @return {null}
 */
exports.retrieveDeviceById= function (deviceId, callback) {
    Logger.info("/proxy/device/retrieveDeviceByOpenId");
    //请求参数异常
    if (deviceId === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    Device.build().retrieve(deviceId, function (data) {
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
    Logger.info("/proxy/device/saveDevice");
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    Device.build().add(jsonData, function (data) {
        callback(null, data);
    },function(){
        callback(new DBError(), null);
    });
};

/**
 * 删除绑定设备信息
 * @param  {object}   openId   用户提交参数
 * @param  {Function} callback callback function
 * @return {null}
 */
exports.deleteDevice = function (openId, callback) {
    Logger.info("/proxy/device/deleteDevice");
    //请求参数异常
    if (openId === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    Device.build().removeByOpenId(openId, function (data) {
        if(data)
            callback(null, data);
        else
            callback(null, new DataNotFoundError());
    },function(){
        callback(new DBError(), null);
    });
};