/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 03/03/16
 Time: 10:30 AM
 Desc: 投票信息业务逻辑控制器
 */


var resUtil = require("../../utils/ResUtil");
var s = require('../../proxy/share');
var resultConfig = require("../../config").initConfig();
var logger = require("../../logger");

/**
 * 保存新闻记录
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.shareNews = function (req, res) {
	logger.info("/controllers/shareController/shareNews");
	var data = req.body.data || "";
	data = data.trim();
	logger.info("客户端请求参数：" + data);
	var jsonData = JSON.parse(data);

	s.shareNews(jsonData, function(err, news) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
		logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
	});
};


/**
 * 保存新闻记录
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.setNews = function (data,res) {
	s.shareNews(data, function(err, news) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
		logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
	});
};


/**
 * 获取新闻记录
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.getNews = function (req, res) {
	
	logger.info("/controllers/shareController/getNews");
	var data = req.body.data || "";
	data = data.trim();
	logger.info("客户端请求参数：" + data);
	var jsonData = JSON.parse(data);

	s.getNews(jsonData, function(err, news) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
		logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
	});
};


/**
 * 获取新闻记录
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.getNewsE = function (date,res) {
	s.getNews(date, function(err, news) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
		logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		var c = resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE).data;
		var ct = new Date(c.createDate);
		var mm = ct.getMinutes();
		var hh = ct.getHours();

		if(hh-0<10){
			hh = "0" + hh
		}
		if(mm-0<10){
			mm = "0" + mm
		}
		var _content = {
			title : c.title,
			author : c.author,
			creatTime : (ct.getMonth() + 1) + "月" + ct.getDate() + "日  " + hh + ":" + mm,
			img : c.img,
			cm : c.content
		}
		console.log(_content);
		res.render('game/share.html',{content : _content});
	});
};
/**
 * 获取新闻记录
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.getNews = function (req, res) {
	
	logger.info("/controllers/shareController/getNews");
	var data = req.body.data || "";
	data = data.trim();
	logger.info("客户端请求参数：" + data);
	var jsonData = JSON.parse(data);

	s.getNews(jsonData, function(err, news) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
		logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(news, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
	});
};