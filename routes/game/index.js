var express = require('express');
var router = express.Router();
var fs = require('fs');
/*var multiparty = require('multiparty');*/
// var util = require('util');
var request = require('request');
// var auth = require('../../controllers/game/likeU/auth');
// var wxapi = require('../../utils/wxapi');
var router = express.Router();
var log4js = require('log4js');
var config = require('../../config/game/likeU/config');
var API = require('wechat-api');
var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx171b34dbe80e67f5&redirect_uri=http://wyxj.cume.cc/website/gamePage/likeU/start&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
var app_id = config.likeU.app_id;
var app_secret = config.likeU.app_secret;
var weChat_api = new API(app_id, app_secret);
var getToken = require('../../utils/likeUapi').wxGetAccessToken;
var make = require('../../controllers/game/likeU/make');
var start = require('../../controllers/game/likeU/start');
var mysql = require('mysql');


//set up log4js
log4js.configure({
    appenders: [
    	{ type: "console" },
        {   type: "file",
            filename: "logs/likeU_index.log",
            category: 'log4jslog'
        }
    ],
    
    replaceConsole: true
});

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'index');

var logger = log4js.getLogger('index');
logger.setLevel('INFO');

logger.info("start!");


// //连接mysql数据库
// var connection = mysql.createConnection({
// 	host: config.mysql.host,
// 	user: config.mysql.user,
// 	password: config.mysql.password
// });

// connection.connect(function(err){
// 	if (err) {
// 		logger.error("mysql err:"+ err);
// 		return;
// 	}
// 	logger.info("mysql connected!");
// });






router.get('/index', function(req, res, next) {
	res.render('game/index.html');
});


router.get('/fillIn', function(req, res, next) {
  	var name = req.query.name;
  	//防止注入



	setNews(name,res);
});




//likeU
router.get('/likeU', function(req, res, next) {
	res.redirect(_url);
});
	

router.get('/likeU/start', start.index);
	

router.get('/likeU/make', make.index);

router.get('/likeU/getQuestion', make.getQuestion); 


router.get('/likeU/share', function(req, res, next) {
	res.render('game/likeU/share.html');
});


router.get('/likeU/end', function(req, res, next) {
	res.render('game/likeU/end.html');
});


















module.exports = router;
