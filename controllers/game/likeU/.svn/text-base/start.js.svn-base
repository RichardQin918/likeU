var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var router = express.Router();
var log4js = require('log4js');
var config = require('../../../config/game/likeU/config');
var API = require('wechat-api');
var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx171b34dbe80e67f5&redirect_uri=http://wyxj.cume.cc/website/gamePage/likeU/start&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
var app_id = config.likeU.app_id;
var app_secret = config.likeU.app_secret;
var weChat_api = new API(app_id, app_secret, function (callback) {
    // 传入一个获取全局token的方法
    fs.readFile('./cache/access_token.txt', 'utf8', function (err, txt) {
        // logger.info("读取文件中的AccessToken");
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(null, JSON.parse(txt));
    });
}, function (token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    // logger.info("写入文件中的AccessToken" + JSON.stringify(token));

    fs.writeFile('./cache/access_token.txt', JSON.stringify(token), callback);
});



exports.index = function(req, res, next){
    
    // log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'start');
    var logger = log4js.getLogger('start');
    logger.setLevel('INFO');

    var code = req.query.code;

    logger.info("the code is " + code);

    var token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx171b34dbe80e67f5&secret=c4bd689e38d38afff7e88290e59d73c7&code='+code+'&grant_type=authorization_code';
    var _res = res;

    //获取并储存token和openid

    var token = "", isReturn = false;
    var openid = "";
    var outputFileName = 'tokenSaver.txt';
    fs.readFile(outputFileName, 'utf-8', function(err, data){ 
        if(err){
            logger.info("sit 1! error!");
            logger.error(err);
        }
        else {
            // logger.info("this is the token_url:"+token_url);
            if (!data || JSON.parse(data).createTime - new Date().getTime() < -72000){
                logger.info("sit 2! token out of date!");
                request.get(token_url, function(error, res, body) {
                    if (error){
                        logger.error(error);
                    }
                    // logger.info("this is the body:" + body);
                    tokenObj = JSON.parse(body);
                    token = tokenObj.access_token, isReturn = true;
                    openid = tokenObj.openid;
                    // logger.info("these are access_token and openid:" + token + openid);
                    var tokenJSON = {
                    token: token,
                    openid: openid,
                    createTime: new Date().getTime() 
                    };  

                    //获取userinfo
                    // logger.info("this is the data:" + token + openid);
                    var user_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+token+'&openid='+openid;
                    // logger.info("user_url  is:" + user_url);
                    request.get(user_url, function(error, res, body) {
                        if(!error){
                            // logger.info("this is the body" + body + typeof(body));
                            // console.log('we are here!');
                            _res.render('game/likeU/start.html',{
                                myInfo:JSON.parse(body)
                                });
                        }
                    });

                    fs.writeFile(outputFileName, JSON.stringify(tokenJSON), function(err) {
                        if (err){
                            logger.error(err);
                        }
                        else {
                            logger.info("JSON saved to " + outputFileName);
                        }
                    });
                });
            }       
            else {
                logger.info("sit 3! normal");
                token = JSON.parse(data).token;
                openid = JSON.parse(data).openid;
                var tokenJSON = {
                    token: token,
                    openid: openid,
                    createTime: new Date().getTime() 
                    };  

                //获取userinfo
                
                var user_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+token+'&openid='+openid;
                request.get(user_url, function(error, res, body) {
                    if(!error){
                        // logger.info("this is the body" + body + typeof(body));
                        // console.log('we are here!');
                        _res.render('game/likeU/start.html',{
                            myInfo:JSON.parse(body)});
                    }
                });

                fs.writeFile(outputFileName, JSON.stringify(tokenJSON), function(err) {
                    if (err){
                        logger.error(err);
                    }
                    else {
                        // logger.info("JSON saved to " + outputFileName);
                    }
                });
            } 
        }
        // logger.info("we are done!");
    });   
}

exports.getWxConfig = function(req, res, next){
    log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'start - getWxConfig');
    var logger = log4js.getLogger('start - getWxConfig');
    logger.setLevel('INFO');
    var url = req.query.shareURL;
    logger.info
    var param = {
        debug: true,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
        url: url
    };
    weChat_api.getJsConfig(param, function(err, result){
        if(err){
            logger.error('getJsConfig err!' + JSON.stringify(err));
        }
        var wxConfig = result;
        logger.info("this is wxConfig:" + wxConfig);
        res.send(wxConfig);
    });
}