var getRandom = require('../../../utils/likeUapi').getRandom;
var log4js = require('log4js');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../../../config/game/likeU/config');
// var EventProxy = require('eventproxy');


exports.index = function(req, res, next){
	log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'make - index');
	var logger = log4js.getLogger('make - index');
	logger.setLevel('INFO');

	//get 15 random numbers
	var qbase = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
	var questions = [];
	var qbak = [];
	var q_list = getRandom(qbase,15,25);
	logger.info('this is the question list' + q_list);

	//get all questions
	fs.readFile('./config/game/likeU/question.json', 'utf8', function(error, data){ 
		if(error) {
			logger.error(error);
		}
		//append question list
		for (var i=0;i<5; i++){
			p = q_list[i];
			// logger.info('inputing question' + p);
			questions .push(JSON.stringify(JSON.parse(data).question[p]));
		};

		for (var i=5; i<q_list.length; i++){
			p = q_list[i];
			// logger.info('inputing questionbak' + p);
			qbak .push(JSON.stringify(JSON.parse(data).question[p]));
		};
		// logger.info('the chosen questions are' + questions  + 'and back-up qs are:' + qbak );
		// logger.info('here is an example:'+questions[0]);
		
		res.render('game/likeU/make.html', {
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
		});
		logger.info('done!');
	});

};




exports.inputData = function(req, res, next){
	log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'make - inputData');
	var logger = log4js.getLogger('make - inputData');
	logger.setLevel('INFO');
	//connect to database
	var conn = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.user,
		password: config.mysql.password
	});

	conn.connect(function(err){
		if (err) {
			logger.error('mysql err:'+ err);
			return;
		}
		logger.info('mysql connected!');
	});
	conn.query('use ' + config.mysql.database + ';');

	//receiving data and store in database
	var data = req.body;
	// logger.info("this is data received!:" + JSON.stringify(data));
	var answerID = '';
	var questionID = data.questionID;
	var mode = data.mode;
	// logger.info('this is questionID:' + questionID);
	var openID = data.openID;
	// logger.info('this is content:' + content);
	var content = data.content;
	// logger.info('the mode is ' + mode + typeof(mode));
	var makerAnswerList = [];
	var grade = 0;
	var takerHead = data.takerhead;
	var takerName = data.takername;


	//convert array into string
	var qIDChar = '';
	var contentChar = '';
	for (i=0; i < questionID.length; i++){
		qIDChar += '+' + questionID[i];	
	}
	// qIDChar = JSON.stringify(qIDChar);
	// logger.info('this is qIDchar:'+ qIDChar + typeof(qIDChar));

	for (i=0; i < content.length; i++){
		contentChar += '+' + content[i];
	}
	// contentChar = JSON.stringify(contentChar);
	// logger.info('this is contentchar:'+ contentChar);	

	// var questionID = '1';
	// var openID = '1';
	// var content = '1';
	logger.info('sup!');
	// for (var obj in data){
	// 	logger.info('this is wat in req:' + obj);
	// }
	
	////ANSWER mode couunting grade
	if (data.answerID){
		answerID = data.answerID;
		logger.info("this is answerID:" + answerID);
	}

	else{
		logger.error('no data.answerID!');
	}


	if (mode == 'maker'){

		conn.query('delete from MAKER where OpenID = ?', openID, function selectMAKER(err){
			if (err){
				throw err;
			}
		});
		logger.info('insert into MAKER VALUES' + qIDChar + ',' + openID + ',' + contentChar + ' );');
		
		conn.query('insert into MAKER SET?', {QuestionID: qIDChar, OpenID: openID, Content: contentChar});
		res.send("received!");

		conn.end();
	}

	else if (mode == 'taker'){
		conn.query('delete from ANSWER where OpenID =? and AnswerID = ?',[openID, answerID] ,  function selectMAKER(err){
			if (err){
				throw err;
			}
		});
		// conn.query('insert into ANSWER VALUES ( ' + answerID + ',' + qIDChar + ',' + openID + ',' + contentChar + ' );');
		conn.query('select Content from MAKER where OpenID =?',answerID , function(err, results){
			logger.info(" this is the very first line" + JSON.stringify(results));
			if (err){
				logger.error("select content err!!)" + err);
			}
			logger.info("this is maker answer!:" + JSON.stringify(results));
			answerStr = results[0].Content;

			//convert string to table
			for (i=0; i<answerStr.length;i++){
				p = answerStr[i];
				var choice = '';
				if (p == "+"){
					while (answerStr[i+1] != "+" && i < answerStr.length -1){
						choice = choice + answerStr[i+1];
						i++;
					}
					makerAnswerList .push(choice);
				}
			}
			logger.info("this is the makerAnswerList & takerAnswerList:" + makerAnswerList + typeof(makerAnswerList) + '&' + content + typeof(content));
			// logger.info("comparing" + makerAnswerList[0] + ',' + content[0]);

			//comparing maker and taker answer and get final grade
			for (i=0; i< makerAnswerList.length; i++){
				if (makerAnswerList[i] == content[i]){
					grade = grade + 0.2;
				}

			}
			grade = (Math.round(grade * 10000)/100).toFixed(0) + '%';
			// logger.info("the grade is:"+ grade);

			
			// conn.query('desc MAKER;');

			
			logger.info("grade is this now:" + grade + typeof(grade));
			//callback(grade);
			// var callback=function(err, results){
			// 	res.send(12345);
			// }
			contentChar = JSON.stringify(contentChar + '+' + grade + '+' + takerName + '+' + takerHead);
			logger.info('insert into ANSWER SET?' + '{AnswerID:' + answerID + ',' + 'QuestionID:' + qIDChar + ',' + 'OpenID:' + openID + ',' + 'Content:' + contentChar + '}');
			conn.query('insert into ANSWER SET ?', {AnswerID: answerID, QuestionID: qIDChar, OpenID: openID, Content: contentChar}, function(err, results){
				
				conn.query('select Content from ANSWER where AnswerID =?', answerID, function(err, results){
				Content = results;
				logger.info("this is the respongind data:" + JSON.stringify(Content));
				// logger.info('send!!!!');
				var respondingData = {
					"grade": grade,
					"content": Content
				}
				res.send(JSON.stringify(respondingData));
				conn.end();
			});
	
			});
		
			
		});
		
	}

	else {
		logger.info('err!');
		res.send("received!")
		conn.end();
	};
	logger.info("this is grade global:"+ grade);
	
};

exports.getQuestion = function(req, res, next){
	log4js.addAppender(log4js.appenders.file('logs/likeU_index.log'), 'make - getQuestion');
	var logger = log4js.getLogger('make - getQuestion');
	logger.setLevel('INFO');
	//connecting to database
	var conn = mysql.createConnection({
		host: config.mysql.host,
		user: config.mysql.user,
		password: config.mysql.password
	});

	conn.connect(function(err){
		if (err) {
			logger.error('mysql err:'+ err);
			return;
		}
		logger.info('mysql connected!');
	});

	// data = req.query;
	// logger.info("this is the data received;" + JSON.stringify(req.query));

	creater = req.query.creater;
	// logger.info("this is the creater of the q:" + creater);
	//select data and send 
	logger.info('choose mysql database:' + 'use ' + config.mysql.database + ';')
	conn.query('use ' + config.mysql.database + ';');
	conn.query('select * from MAKER where OpenID =' + JSON.stringify(creater) + ';', function selectMAKER(err, results, fields){
		if(err){
			throw err;
		}
		else if(JSON.stringify(results) == '[]'){
			logger.error('no table');
		}

		chosenQ = results[0].QuestionID;
		// logger.info("this is the QuestionID:" + chosenQ);
		var numberList =[];
		var qList = [];

		//find corrsponding question 
		fs.readFile('./config/game/likeU/question.json', 'utf8', function(error, data){ 
			if(error) {
				logger.error(error);
			}
			//fix qid 
			for (i=0; i<chosenQ.length;i++){
				p = chosenQ[i];
				var number = '';
				if (p == "+"){
					while (chosenQ[i+1] != "+" && i < chosenQ.length -1){
						number = number + chosenQ[i+1];
						i++;
					}
					number =parseInt(number);
					numberList .push(number - 1);
				}
			}
			// logger.info("this is the number list:" + numberList);
			//find question according to qid
			for (i=0; i<numberList.length; i++){
				p = numberList[i];
				// logger.info('inputing question' + p + 1);
				qList .push(JSON.stringify(JSON.parse(data).question[p]));
			}	
			qList .push(JSON.stringify(results));
			// logger.info("this is the maker qList:"+ qList + qList.length);
			res.send(qList);
		});
        
	});
	
    conn.end();
};
