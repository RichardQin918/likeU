var express = require('express');
var router = express.Router();
var fs = require('fs');
/*var multiparty = require('multiparty');*/
var util = require('util');
var request = require('request');
var auth = require('../../controllers/game/likeU/auth');
var config = require('../../config/game/likeU/config');
var router = express.Router();
var API = require('wechat-api');
var log4js = require('log4js');

var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx171b34dbe80e67f5&redirect_uri=http://wyxj.cume.cc/website/gamePage/likeU/start&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
// var deasync = require("deasync");

var app_id = config.likeU.app_id;
var app_secret = config.likeU.app_secret;
var api = new API(app_id, app_secret);

var getToken = require('../../utils/likeUapi').wxGetAccessToken;

var getRandom = require('../../utils/likeUapi').getRandom;



//配置日志
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





//likeU
router.get('/likeU', function(req, res, next) {
	res.redirect(_url);
});
	

router.get('/likeU/start', function(req, res, next) {
	//获取code


	log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'start');

	var logger = log4js.getLogger('start');
	logger.setLevel('INFO');



	var code = req.query.code;

	logger.info("the code is " + code);

	var token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx171b34dbe80e67f5&secret=c4bd689e38d38afff7e88290e59d73c7&code='+code+'&grant_type=authorization_code';
	var _res = res;

	//获取accessToken
	// var token = getToken();
	// console.log("result is " + JSON.stringify(token));

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
			logger.info("this is the token_url:"+token_url);
			if (!data || JSON.parse(data).createTime - new Date().getTime() < -72000){
				logger.info("sit 2! token out of date!");
            	request.get(token_url, function(error, res, body) {
            		logger.info("this is the body:" + body);
					tokenObj = JSON.parse(body);
					token = tokenObj.access_token, isReturn = true;
					openid = tokenObj.openid;
					logger.info("these are access_token and openid:" + token + openid);
	            	var tokenJSON = {
					token: token,
					openid: openid,
					createTime: new Date().getTime() 
					}; 	

					//获取userinfo
					logger.info("this is the data:" + token + openid);
					var user_url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+token+'&openid='+openid;
				    logger.info("user_url  is:" + user_url);
				    request.get(user_url, function(error, res, body) {
				    	if(!error){
				    		logger.info("this is the body" + body + typeof(body));
				    		// console.log('we are here!');
							_res.render('game/likeU/start.html',{myInfo:JSON.parse(body), need_login:true, errMessage:""});
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
			}
		}
  
    });	
});
// });

router.get('/likeU/make', function(req, res, next) {

	log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'make');

	var logger = log4js.getLogger('make');
	logger.setLevel('INFO');


	
	//取随机15组数字
	var qbase = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,20,21,22,23,24,25,26];
	var questions = [];
	var qbak = [];
	var q_list = getRandom(qbase,15,25);
	logger.info("this is the question list" + q_list);

	

	//取所有问题
	fs.readFile("./config/game/likeU/question.json", "utf8", function(error, data){ 
		if(error) {
			logger.error(error);
		}
		//传递问题
		for (var i=0;i<5; i++){
			p = q_list[i];
			logger.info("inputing question" + p);
			questions .push(JSON.stringify(JSON.parse(data).question[p]));
		};

		for (var i=5; i<q_list.length; i++){
			p = q_list[i];
			logger.info("inputing questionbak" + p);
			qbak .push(JSON.stringify(JSON.parse(data).question[p]));
		};
		// logger.info("the chosen questions are" + questions  + "and back-up qs are:" + qbak );
		// logger.info("here is an example:"+questions[0]);
		
		res.render('game/likeU/make.html', {
			// question1: eval('(' + questions[0] + ')'),
			question1: questions[0],
			question2: questions[1],
			question3: questions[2],
			question4: questions[3],
			question5: questions[4],
			qbak1: qbak[0],
			qbak2: qbak[1],
			qbak3: qbak[2],
			qbak4: qbak[3],
			qbak5: qbak[4],
			qbak6: qbak[5],
			qbak7: qbak[6],
			qbak8: qbak[7],
			qbak9: qbak[8],
			qbak10: qbak[9]
			// questions: eval('(' + questions + ')')
		});
		logger.info("done!");
	});
});
// });



router.get('/likeU/share', function(req, res, next) {
	res.render('game/likeU/share.html');
});


router.get('/likeU/end', function(req, res, next) {
	res.render('game/likeU/end.html');
});







module.exports = router;
