var request = require('request');
var config = require('../config/game/likeU/config');
var fs = require('fs');
var API = require('wechat-api');
var deasync = require('deasync');
var app_id = config.likeU.app_id;
var app_secret = config.likeU.app_secret;
var weChat_api = new API(app_id, app_secret);

//获取微信accessToken
exports.wxGetAccessToken = function () {
    var outputFilename = 'accessTokenCache.txt';
    var token = "",isReturn = false;
    fs.readFile(outputFilename ,'utf-8', function(err,data){ 
        if(err){
            tokenObj = _wxGetAccessToken();
        }else{
            if(!data || JSON.parse(data).createTime - new Date().getTime() < -72000){
                tokenObj = _wxGetAccessToken();
                //console.log(222);
            }else{
                token = JSON.parse(data).token;
                //console.log(333);
            }
        }
    isReturn = true;
  });

  // while(!isReturn){
  //    deasync.runLoopOnce();
  // }
  return token;
};


//获取微信accessToken
var _wxGetAccessToken = function(){
    var outputFilename = 'accessTokenCache.txt';
    var token = "", isReturn = false;
    //读取缓存的accessToke,如果过期，重新获取
    weChat_api.getLatestToken(function (err, result) {
        console.log("获取token：" + JSON.stringify(result));
        token = result.accessToken;
        console.log("token2" + result);
        isReturn = true;
    });
    var tokenJson = {
        token : token,
        createTime : new Date().getTime()
    };
    fs.writeFile(outputFilename, JSON.stringify(tokenJson), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });
    return token;
};


//随机选取
exports.getRandom = function(arr, num, max) { 
//新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组; 
var temp_array = new Array(); 
for (var index in arr) { 
    temp_array.push(arr[index]); 
} 
//剔除一些数字
//取出的数值项,保存在此数组 
var return_array = new Array(); 
for (var i = 0; i < num; i++) {
//判断如果数组还有可以取出的元素,以防下标越界 
    if (temp_array.length>0) { 
        //在数组中产生一个随机索引 
        var arrIndex = Math.floor(Math.random()*temp_array.length); 
        //将此随机索引的对应的数组元素值复制出来 
        return_array[i] = temp_array[arrIndex]; 
        //然后删掉此索引的数组元素,这时候temp_array变为新的数组 
        temp_array.splice(arrIndex, 1); 
        } 
    else { 
    //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项. 
        break; 
    } 
} 
return return_array; 
};










