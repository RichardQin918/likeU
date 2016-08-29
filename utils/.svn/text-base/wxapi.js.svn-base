/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 01/11/16
 Time: 18:30 PM
 Desc: 微信常用功能
 */
"use strict";
var request = require('request');
var logger = require("../logger");
var API = require("wechat-api");
var config = require('config');
var deasync = require('deasync');
var fs = require('fs');
//配置项
var app_id = "wx171b34dbe80e67f5";//借用友赞，原来config.get('wx_xiangjia.app_id')
var app_secret = "c4bd689e38d38afff7e88290e59d73c7"; //借用友赞，原来config.get('wx_xiangjia.app_secret');
//配置微信API
var api = new API(app_id, app_secret, function (callback) {
    // 传入一个获取全局token的方法
    fs.readFile('./cache/access_token.txt', 'utf8', function (err, txt) {
        logger.info("读取文件中的AccessToken");
        if (err) {
            logger.info(err);
            return callback(err);
        }
        callback(null, JSON.parse(txt));
    });
}, function (token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    logger.info("写入文件中的AccessToken" + JSON.stringify(token));

    fs.writeFile('./cache/access_token.txt', JSON.stringify(token), callback);
});

//SDK直连get指令
exports.wxSDKDeviceGet = function (accessToken, data, callback) {
    var get_device_url = 'https://api.weixin.qq.com/hardware/mydevice/platform/get_device_status?access_token=' + accessToken;
    var opts = {
        method: 'POST',
        uri: get_device_url,
        json: true,
        body: data
    };
    //请求微信硬件SDK平台
    request(opts, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            logger.info("来自微信硬件平台返回：" + JSON.stringify(data));
            callback(null, data);
        }
    });
};

//SDK直连ctrl指令
exports.wxSDKDeviceCtrl = function (accessToken, data, callback) {
    var ctrl_device_url = 'https://api.weixin.qq.com/hardware/mydevice/platform/ctrl_device?access_token=' + accessToken;
    var opts = {
        method: 'POST',
        uri: ctrl_device_url,
        json: true,
        body: data
    };
    //请求微信硬件SDK平台
    request(opts, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            logger.info("来自微信硬件平台返回：" + JSON.stringify(data));
            callback(null, data);
        }
    });
};

//绑定设备
exports.wxBindDevice = function (jsonData,callback) {
    api.getTicket(function (err,ticket) {
        logger.error(jsonData.deviceId+"////"+ jsonData.openId+"////"+ ticket.ticket)
        api.bindDevice(jsonData.deviceId, jsonData.openId, ticket.ticket, function (err, result) {
            callback(null, result);
        });
    });
};
//解绑设备
exports.wxUnbindDevice = function (deviceId, openid, ticket, callback) {
    api.unbindDevice(deviceId, openid, ticket, function (err, result) {
        callback(null, result);
    });
};

//强制绑定设备
exports.wxComplBindDevice = function (deviceId, openid, callback) {
    api.compelBindDevice(deviceId, openid, function (err, result) {
        callback(null, result);
    });
};

//强制解除绑定设备
exports.wxComplUnbindDevice = function (deviceId, openid, callback) {
    api.compelUnbindDevice(deviceId, openid, function (err, result) {
        callback(null, result);
    });
};

//获取微信accessToken
exports.wxGetAccessToken = function (callback) {
    //读取缓存的accessToke,如果过期，重新获取
    api.getLatestToken(function (err, result) {
        callback(result.accessToken);
    });
    //while (!isReturn) {
    //    deasync.runLoopOnce();
    //}
};


//获取jsConfig
exports.wxGetJsConfig = function (jsonData, callback) {
    api.getJsConfig(jsonData, function (err, result) {
        callback(null, result);
    });
};

//批量获取用户信息 
exports.wxBatchGetUsers = function (jsonData, callback) {
    api.batchGetUsers(jsonData, function (err, result) {
        callback(null, result);
    });
};

//获取微信用户Code
exports.getUserByCode = function (code, callback) {
    api.getUserByCode(code, function (err, result) {
        callback(null, result);
    });
};

//向指定的openid的用户发送消息
exports.sendText = function (jsonData, callback) {
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(), null);
    }

    api.sendText(jsonData.openId, jsonData.msg, function (err, result) {
        callback(null, result);
    });
};

//获取用户关注列表
exports.wxGetFollowers = function (jsonData, callback) {
    console.log("/utils/wxapi/wxGetFollowers");
    console.log(jsonData.nextOpenid);
    //请求参数异常
    if (jsonData.nextOpenid == '') {
        api.getFollowers(function (err, result) {
            callback(null, result);
        });
    } else {
        api.wxGetFollowers(jsonData.nextOpenid, function (err, result) {
            callback(null, result);
        });
    }

};

//获取用户关注列表
exports.wxShorturl = function (jsonData, callback) {
    logger.info("/utils/wxapi/wxShorturl");
    //console.log(jsonData.longUrl);
    //请求参数异常
    if (jsonData.longUrl == 'undefined') {
        return callback(new InvalidParamError(), null);
    }

    api.shorturl(jsonData.longUrl, function (err, result) {
        callback(null, result);
    });
};

//发送红包Key
exports.wxSendRedpackKey = function (jsonData, callback) {
    logger.info("/utils/wxapi/wxSendRedpackKey");
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(), null);
    }
    api.shorturl(jsonData.longUrl, function (err, result) {
        callback(null, result);
    });
};

//发送模板消息
exports.wxSendTemplate = function (jsonData, callback) {
    logger.info("/utils/wxapi/wxSendTemplate");
    //请求参数异常
    if (jsonData === 'undefined') {
        return callback(new InvalidParamError(), null);
    }

    api.sendTemplate(jsonData.openid, jsonData.templateId, jsonData.url, jsonData.data, function (err, result) {
        callback(null, result);
    });
};


//获取硬件二维码
exports.wxGetDeviceQRCode = function (deviceId, callback) {
    api.getDeviceQRCode(deviceId, function (err, result) {
        callback(null, result);
    });
};


//获取永久二维码
exports.wxCreateLimitQRCode = function (sceneId, callback) {
    api.createLimitQRCode(sceneId, function (err, result) {
        callback(null, result);
    });
};
