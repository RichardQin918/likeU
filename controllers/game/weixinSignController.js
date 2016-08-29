/*
 Created with Sublime Text 2.
 User: yanglong
 Date: 11/10/13
 Time: 10:30 AM
 Desc: 获取签名供js-sdk用
 */
/* wx.config({
    debug: false, 
    appId: "你的AppID", 
    timestamp: '上一步生成的时间戳', 
    nonceStr: '上一步中的字符串', 
    signature: '上一步生成的签名',
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
});*/

var request = require("request");
var crypto = require("crypto");
var access_tokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb8d8c904d0415c7c&secret=61fe4ff8d5f39b82eb8f19c762c5d6f9"
var url = "http://www.cume.cc/gamePage/index";
var fs = require('fs');
var outputFilename = '/cache/jsSignCache.txt';
exports.calcSignature = function(req, res, next){
    var _res = res ;
    fs.readFile( outputFilename ,'utf-8', function(err,data){
         if(err){ 
              getTicket(_res);

         }else{ 
           if(!data || JSON.parse(data).createTime - new Date().getTime() < -72000){
              getTicket(_res);

           }else{
              _res.send(JSON.parse(data));

           }
         } 
      })

    
};


var getTicket = function(_res){
    request.get(access_tokenUrl, function(error, res, body) {
        if (!error) {
            try {
                var token = JSON.parse(body).access_token;
				console.log(token);
                request.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi', function(error, res, body) {
              if (!error) {
                  try {
                      var ticket = JSON.parse(body).ticket;
                      fs.writeFile(outputFilename, JSON.stringify(sign(ticket,url)), function(err) {
                          if(err) {
                            console.log(err);
                            _res.send(500)
                          } else {
                            console.log("JSON saved to " + outputFilename);
                             _res.send(sign(ticket,url));
                          }
                      });
                  } catch (e) {
                     
                  }
              }
          });
            } catch (e) {
                
            }
        }
    });
};


var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
      jsSHA = require('jssha');
      shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');
  ret.createTime = new Date().getTime();
  console.log(ret)

  return ret;
};

