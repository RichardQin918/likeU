/*
 Created with WebStorm.
 User: mengpeng
 Date: 01/11/16
 Desc: 用户代理类型
 */
'use strict';
var Logger = require('../logger');
var User = require('../models/user');
//var sequelize = require('../models/schema').schema();

/**
 * 根据微信openId信息获取用户信息
 * @param  {string}   openId   微信用户ID
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.retrieveUserByOpenId = function (openId, callback) {
    Logger.info("/proxy/user/retrieveByOpenId");
    //请求参数异常
    if (openId === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    User.build().retrieveByOpenId(openId, function (user) {
        callback(null, user);
    }, function () {
        callback(new DBError(), null);
    });
};

/**
 * 根据微信openId信息获取用户信息
 * @param  {string}   openIds   微信用户ID数组对象
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.retrieveUserByOpenIds = function (openIds, callback) {
    Logger.info("/proxy/user/retrieveByOpenIds");
    //请求参数异常
    if (openIds === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    User.build().retrieveByOpenIds(openIds, function (users) {
        callback(null, users);
    }, function () {
        callback(new DBError(), null);
    });

    //sequelize.query('select * from dt_users where open_id in (?)', {
    //    model: User,
    //    type: sequelize.QueryTypes.SELECT,
    //    replacements: [openIds]
    //}).then(function (users) {
    //    callback(null, users);
    //}).catch(console.log.bind(console));

    //sequelize.query('select * from dt_users where open_id in (?)', {
    //    model: User,
    //    mapToModel: true,
    //    type: sequelize.QueryTypes.SELECT,
    //    replacements: [openIds]
    //}).spread(function (users,metaData) {
    //    console.log(metaData);
    //    callback(null, users);
    //});
};

/**
 * 根据微信openId信息获取用户信息
 * @param  {string}   openId   微信用户ID
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.retrieveUserById = function (id, callback) {
    Logger.info("/proxy/user/retrieveUserById");
    //请求参数异常
    if (id === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    User.build().retrieveByOpenId(openId, function (user) {
        callback(null, user);
    }, function () {
        callback(new DBError(), null);
    });

    //sequelize.query('select * from dt_users  where id = ?', {
    //    model: User,
    //    type: sequelize.QueryTypes.SELECT,
    //    replacements: [id]
    //}).then(function (user) {
    //    callback(null, user);
    //}).catch(console.log.bind(console));
};

/**
 * 根据微信openId更新用户信息
 * @param  {string}   openId   微信用户openId
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.deleteUserByOpenId = function (openId, callback) {
    Logger.info("/proxy/user/deleteUserByOpenId");

    //请求参数异常
    if (openId === 'undefined') {
        return callback(new InvalidParamError(), null);
    }

    User.build().removeByOpenId(openId, function (user) {
        callback(null, user);
    }, function () {
        callback(new DBError(), null);
    });
};


/**
 * 保存用户信息
 * @param  {string}   jsonData  微信用户
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.saveUser = function (jsonData, callback) {
    Logger.info("/proxy/user/saveUser");
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    User.build().add(jsonData, function (user) {
        callback(null, user);
    }, function () {
        callback(new DBError(), null);
    });
};
