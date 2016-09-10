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


//get accessToken
var _wxGetAccessToken = function(){
    var outputFilename = 'accessTokenCache.txt';
    var token = "", isReturn = false;
    //read accessToke,if expired，request again
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


//getRandom
exports.getRandom = function(arr, num, max) {  
    //create an array, copy the arr for calculation use.
    var temp_array = new Array(); 
    for (var index in arr) { 
        temp_array.push(arr[index]); 
    } 
    //delete some numbers
    //take some number and save it in temp_array
    var return_array = new Array(); 
    for (var i = 0; i < num; i++) {
    //avoid empty array error 
        if (temp_array.length>0) { 
            //get random index
            var arrIndex = Math.floor(Math.random()*temp_array.length); 
            //copy the number according to index
            return_array[i] = temp_array[arrIndex]; 
            //delete the number, so we have a new array
            temp_array.splice(arrIndex, 1); 
            } 
        else { 
        //exit the loop
            break; 
        } 
    } 
    return return_array; 
};










