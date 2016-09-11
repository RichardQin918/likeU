//正则
App.factory('verify', function(){
	var factory = {};
	factory.isUrl =  function(str_url){
		var strRegex = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig;
		var re=new RegExp(strRegex);
		if (re.test(str_url)){
			return (true);
		}else{
			return (false);
		}
	}

	return factory;
});


//获取微信openid的公用服务
App.factory('weixin', function(){
	var factory = {};
	factory.getOpenId = function(side){
		if(!localStorage.getItem("openId")){
			window.location.href = App.urlConfig.push;
			localStorage.setItem("backUrl" , App.baseUrl + "weixin/#/"+side+"/");
		}else{
			return localStorage.getItem("openId");
		}
	};

	return factory;
});