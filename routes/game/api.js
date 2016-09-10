var express = require('express');


var wxapi = require('../../utils/wxapi');


var router = express.Router();

var make = require('../../controllers/game/likeU/make');

var start = require('../../controllers/game/likeU/start');



//get js-sdk sign API
router.get('/getJsConfig',function(req,res,next){
	var _url = req.query._url;
	var jsonData = {
		beta: true,
		debug: true,
		url: _url,
		jsApiList: []
	};
	wxapi.wxGetJsConfig(jsonData,function(err,result){
		res.send(result);
	});
});


router.post('/likeU/inputData', make.inputData);

router.get('/likeU/getWxConfig', start.getWxConfig);

module.exports = router;