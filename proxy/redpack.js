/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 01/20/16
 Time: 10:43 AM
 Desc: 红包代理类型
 */
'use strict';
var Redpack = require('../models/redpack');
var logger = require('../logger');

/**
 * 获取支付口令密码并送给指定的openid用户
 * @param  {string}   openId   微信号
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.sendRedpackKey = function(josnData,callback) {
    logger.info("/proxy/redpack/sendRedpackKey");
     var redpack = Redpack.build();

    //请求参数异常
    if (typeof(jsonData.openId)=='undefined'||
        typeof(jsonData.redpackType)=='undefined') {
        return callback(new InvalidParamError(),null);
    }
    //按条件查询记录
    redpack.retrieveRedpackKey(jsonData, function(redpack) {
        //更新红包试用状态位置
        redpack.updateRedpack(jsonData,function(result){
            console.log("调用更新红包信息...");
        });
        callback(null, redpack);
    });

};


/**
 * 通过商户账号发送红包给指定的openid用户
 * @param  {string}   openId   微信号
 * @param  {Function} callback callback func
 * @return {null}
 */
exports.sendRedpack = function(josnData,callback) {
    logger.info("/proxy/redpack/sendRedpack");
     var redpack = Redpack.build();

    //请求参数异常
    if (typeof(jsonData.openId)=='undefined') {
        return callback(new InvalidParamError(),null);
    }
    //按条件查询记录
    redpack.retrieveRedpackKey(jsonData, function(redpack) {
        //更新红包试用状态位置
        redpack.updateRedpack(jsonData,function(result){
            console.log("调用更新红包信息...");
        });
        callback(null, redpack);
    });

};
