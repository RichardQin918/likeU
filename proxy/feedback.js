/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 22/5/15
 Time: 10:43 AM
 Desc: 用户设备反馈代理类型
 */
'use strict';
var Feedback = require('../models/feedback');
var Logger = require('../logger');
var sequelize = require('../models/schema').schema();

/**
 * 获取用户所有反馈意见
 * @param  {string}   jsonData   意见反馈数据
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.retrieveAllFeedback = function (jsonData, callback) {
    Logger.info("/proxy/feedback/retrieveAllFeedback");
    //请求参数异常
    if (jsonData === 'undefined' ) {
        return callback(new InvalidParamError(),null);
    }
    //按条件查询记录
    //Feedback.build().retrieveAll(function(feedbacks) {
    //    callback(null, feedbacks);
    //});

    sequelize.query('select * from dt_feedbacks', {
        type: sequelize.QueryTypes.SELECT
    }).then(function (feedbacks) {
        callback(null, feedbacks);
    }).then(function () {
        callback(new DBError(), null);
    }).catch(console.log.bind(console));
};

/**
 * 根据用户意见ID获取用户反馈意见
 * @param  {string}   id   意见ID
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.retrieveFeedbackById = function(id,callback) {
    Logger.info("/proxy/feedback/retrieveFeedbackById");
    //请求参数异常
    if ( id === 'undefined') {
        return callback(new InvalidParamError(),null);
    }
   //Feedback.build().retrieveById(id, function (feedbacks) {
   //     callback(null, feedbacks);
   // });

    sequelize.query('select * from dt_feedbacks where id = ?', {
        type: sequelize.QueryTypes.SELECT,
        replacements: [id]
    }).then(function (feedbacks) {
        callback(null, feedbacks);
    }).then(function () {
        callback(new DBError(), null);
    }).catch(console.log.bind(console));
};

/**
 * 保存用户反馈意见
 * @param  {string}   jsonData   用户提交参数
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.saveFeedback = function(jsonData, callback) {
    Logger.info("/proxy/feedback/saveFeedback");
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(),null);
    }
   Feedback.build().add(jsonData, function (feedbacks) {
        callback(null, feedbacks);
    });
};