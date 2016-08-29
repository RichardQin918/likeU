var express = require('express');

//微信公共平台自动回复消息接口服务中间件
var wechat = require('wechat');
var API = require('wechat-api');
// 读取配置模块
var config = require('config');

// var weixin = require('weixin-api'); 

//微信平台授权中间件
var OAuth = require('wechat-oauth');





var router = express.Router();


// 读取相关微信配置信息
var app_id = config.get('wxCume.app_id');
var app_secret = config.get('wxCume.app_secret');
var wx_token = config.get('wxCume.token');
var wx_encodingAESKey = config.get('wxCume.encodingAESKey');

var menu_config = config.get('wxCume.wx_menu');

var domain = config.get('wxCume.domain');


var client = new OAuth(app_id, app_secret);

//配置
var api = new API(app_id, app_secret);

// weixin.token = wx_token;





//认证开发
router.get('/push',function(req,res,next){
    if (weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});


//生成菜单
router.get('/menu',function(req,res,next){
    console.log(menu_config.button[2].sub_button);
    api.createMenu(menu_config, function(err, result){
        console.log(result);
        if(result.errcode == 0){
            res.status(200).send("设置成功");
        }else{
            res.status(200).send("设置失败");
        }
        
    });

});



//OAuth认证
router.get('/authPush', function(req, res) {
  var url = client.getAuthorizeURL('http://' + domain + '/game/callback','','snsapi_userinfo');
  res.redirect(url);
});


/**
 * 认证授权后回调函数
 *
 * 根据openid判断是否用户已经存在
 * - 如果是新老用户都跳到主页
 * 
 */
router.get('/callback', function(req, res) {
  console.log('----weixin callback -----')
  var code = req.query.code;
  
  var User = req.model.UserModel;

  client.getAccessToken(code, function (err, result) {
    console.dir(err)
    console.dir(result)
    var accessToken = result.data.access_token;
    var openid = result.data.openid;
    
    console.log('token=' + accessToken);
    console.log('openid=' + openid);

    User.find_by_openid(openid, function(err, user){
      console.log('微信回调后，User.find_by_openid(openid) 返回的user = ' + user)
      if(err || user == null){
        console.log('user is not exist.')
        client.getUser(openid, function (err, result) {
          console.log('use weixin api get user: '+ err)
          console.log(result)
          var oauth_user = result;
          
          var _user = new User(oauth_user);
          _user.username = oauth_user.nickname;
          _user.nickname = oauth_user.nickname;
          
          _user.save(function(err, user) {
            if (err) {
              console.log('User save error ....' + err);
            } else {
              console.log('User save sucess ....' + err);
              req.session.current_user = void 0;
              res.redirect('/game/index/?name='+ user.nickname);
            }
          });
          
        });
      }else{
        console.log('根据openid查询，用户已经存在')
        // if phone_number exist,go home page
        if(user.is_valid == true){
          req.session.current_user = user;
          res.redirect('/game/index/?name='+ _user.nickname);
        }else{
          //if phone_number exist,go to user detail page to fill it
          req.session.current_user = void 0;
          res.redirect('/game/index/?name='+ user.nickname);
        }
      }
    });
  });
});


/**
 * 
 *获取签名
 *
 **/
// var signature =  require("../../controllers/game/weixinSignController");
// router.get('/getSign',signature.calcSignature);

// var socket = require("../../controllers/socket/weixinSignController");
// router.get('/sgetSign',socket.calcSignature);

// var fool =  require("../../controllers/game/weixinSignController");
// router.get('/foolGetSign',fool.calcSignature);





//获取 accessTocken
// router.get('/getAccesstoken',socket.getAccesstoken);



//获取用户信息





module.exports = router;