/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 03/03/16
 Time: 10:43 AM
 Desc: 图片分享
 */
'use strict';
var Share = require('../models/share');
var logger = require('../logger');

/**
 * 获取分享信息
 * @param  {string}   openId 微信用户OpenId
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.retrieveShareByOpenId = function(openId,callback) {
    logger.info("/proxy/share/retrieveShareByOpenId");

    //请求参数异常
    if (openId ==='undefined') {
        return callback(new InvalidParamError(),null);
    }
    //添加分享记录
     Share.build().retriveByOpenId(openId, function(share) {
         callback(null, share);
    },function(){
         callback(new DBError(), null);
     });
};

/**
 * 保存分享信息
 * @param  {string}   jsonData  分享信息json对象
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.saveShare = function(jsonData,callback) {
    logger.info("/proxy/share/saveShare");
    //请求参数异常
    if (jsonData ==='undefined') {
        return callback(new InvalidParamError(),null);
    }
    //添加分享记录
    Share.build().add(jsonData, function(share) {
        callback(null, share);
    },function(){
        callback(new DBError(), null);
    });
};

/**
 * 删除分享信息
 * @param  {string}   openId  微信用户openId
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.deleteShareByOpenId = function(openId,callback) {
    logger.info("/proxy/share/deleteShareByOpenId");
    //请求参数异常
    if ( openId ==='undefined') {
        return callback(new InvalidParamError(),null);
    }
    //添加分享记录
    Share.build().removeByOpenId(openId, function(share) {
        callback(null, share);
    },function(){
        callback(new DBError(), null);
    });
};