/*
 Created with Sublime Text 2.
 User: MengPeng
 Date: 01/11/16
 Time: 10:30 AM
 Desc: 意见反馈业务逻辑控制器
 */

var resUtil = require("../../utils/ResUtil");
var f = require('../../proxy/feedback');
var logger = require("../../logger");
var resultConfig = require("../../config").initConfig();


/**
 * 获取所有用户反馈意见
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.getAllFeedback = function(req, res, next) {
	logger.info("/controllers/feedbackController/getAllFeedback");

	 var data = req.body.data || "";
    logger.info("请求参数："+data);
    var jsonData = JSON.parse(data);

	f.retrieveAllFeedback(jsondData,function(err,feedbacks) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
        logger.info("服务器响应结果："+JSON.stringify(resUtil.generateRes(feedbacks, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(feedbacks, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));

	});

};

/**
 * 根据ID获取所有用户反馈意见
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.getFeedback = function(req, res, next) {
	logger.info("/controllers/feedbackController/getFeedback");
    var data = req.body.data || "";
    logger.info("请求参数："+data);
    var jsonData = JSON.parse(data);
    
	f.retrieveFeedbackById(jsonData,function(err,feedback) {
		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
		
        logger.info("服务器响应结果："+JSON.stringify(resUtil.generateRes(feedback, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(feedback, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
	});

};

/**
 * 提交用户反馈意见
 * @param  {object}   req  request
 * @param  {object}   res  response
 * @param  {Function} next next handler
 * @return {null}
 */
exports.commitFeedback = function(req, res, next) {
	logger.info("/controllers/feedbackController/commitFeedback");
    console.log(req.body.data);

	var data = req.body.data || "";
	var jsonData = JSON.parse(data);

	f.saveFeedback(jsonData, function(err, rows) {

		if (err) {
			logger.info("服务器响应结果：" + JSON.stringify(resUtil.generateRes(null, err.statusCode, err.message)));
			return res.send(resUtil.generateRes(null, err.statusCode, err.message));
		}
        logger.info("服务器响应结果："+JSON.stringify(resUtil.generateRes(rows, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE)));
		res.send(resUtil.generateRes(rows, resultConfig.statusCode.STATUS_OK, resultConfig.messageInfo.SUCCESS_MESSAGE));
	});
};