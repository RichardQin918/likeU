var config = {};
var fun = {};
var BASEURL = "http://www.cume.cc";
var APPID = "wx514e48bb0f27f3fd";
var OPENID = (function(){
	var openId = localStorage.getItem("_openId");
	if(!openId){
		window.location.href = "http://www.cume.cc/weixin/hardware";
	}else{
		return openId;
	}
})();






//配置----------------------------------------------------------------------------------------------------------------
(function(c){

	//控制码******************
	c.cmds = [
		{
	    	openId: OPENID,
	    	pathName: "",
			cmdName: "getListFilePath"
		}
	];

	//url******************
	c.urls = {
		post_url : BASEURL + "/weixin/hardware/sendSDKCommand" ,//控制设备
		ws_url : "http://120.25.126.93:15674/stomp", //websocket
		getSign_url : BASEURL + "/getSign", //js-sdk 签名
		getDevice_url : BASEURL + "/getDevice" //获取设备信息
	};

	//device******************
	c.devices = {
		device_type : "gh_5a6d62591f97",
		device_id : "gh_5a6d62591f97_accb8f7d2736771f",
	};

	//ws******************
	c.ws = {
		reqQueue : "/topic/session_",
		resQueue : "/topic/res_session_" + OPENID,
		username : "web_user",
		password : "Flzx3qC",
		vhost : "/"
	};

	//签名******************
	c.sign = {};
})(config);


//方法----------------------------------------------------------------------------------------------------------------
(function(f){
	//返回控制设备指令****************** 
	f.getMessage = function(obj){
		var _cmd = {
			openId: obj.openId,
	    	pathName: obj.pathName,
			cmdName: obj.cmdName
		}
		var message = {
			cmd : "get",
			device_type : config.devices.device_type,
			device_id : config.devices.device_id,
			user : OPENID,
			service : {
			    operation_status: {
			        status: 1
			    }
			},
			data: JSON.stringify(_cmd)
		};
		return message;
	};
	//发布和订阅信息******************
	f.websocket = function(cb){
		var ws = new SockJS(config.urls.ws_url);
        var client = Stomp.over(ws);

        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;

        var on_connect = function () {
            client.subscribe(config.ws.resQueue, on_message); //订阅特定主题
        };

        var on_message = function (message) {
        	console.log(JSON.parse(message.body));
        	cb(JSON.parse(JSON.parse(message.body).data));
            //f.render(message,200);
        };

        var on_connection_error = function () {
            console.log('Connected to RabbitMQ-Web-Stomp  connection error<br/>');
            //f.render("Connected to RabbitMQ-Web-Stomp  connection error",500);
        };
        // Connect
        client.connect(
                config.ws.username,
                config.ws.password,
                on_connect,
                on_connection_error,
                config.ws.vhost
        );

        return false;
	};
	//通知阿里云******************
	f.informService = function(message){
		$.ajax({
            url: config.urls.post_url,//请求的url地址
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "POST",
            data: message,
            timeout: 5000,
            success: function (data, status, xhr) {        //请求成功时处理
                console.log(data);
            },
            complete: function (xhr, status) {  //请求完成的处理
                console.log("发送请求完成...");
            },
            error: function (xhr, errorType, error) {  //请求出错处理
                console.log("发送请求出错...");
            }
        });
	};
	//获取设备信息******************
	f.getDeviceInfo = function(){
		var deviveInfo = "";
		$.ajax({
            url: config.urls.getDevice_url,//请求的url地址
            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",
            timeout: 5000,
            success: function (data, status, xhr) {        //请求成功时处理
                console.log(data);
                deviveInfo = data;
            },
            complete: function (xhr, status) {  //请求完成的处理
                console.log("发送请求完成...");
            },
            error: function (xhr, errorType, error) {  //请求出错处理
                console.log("发送请求出错...");
            }
        });
        return deviveInfo;
	};
	//获取js-sdk签名******************
	f.getSign = function(){
        $.ajax({
            url: "/weixin/hardware/getJsConfig?url=www.cume.cc/hardware/#/all",//请求的url地址
            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",
            success: function (req) {
            	console.log(req);
                config.sign = req;
            },
            complete: function () {
                //请求完成的处理
            },
            error: function () {
                //请求出错处理
            }
        });
	};
	//微信配置
	f.wechatConfig = function(){
		fun.getSign();
		wx.config({
	        beta: true,
	        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        appId: APPID, // 必填，公众号的唯一标识
	        timestamp: config.sign.timestamp, // 必填，生成签名的时间戳
	        nonceStr: config.sign.nonceStr, // 必填，生成签名的随机串
	        signature: config.sign.signature,// 必填，签名，见附录1
	        jsApiList: ['checkJsApi', 'openWXDeviceLib', 'closeWXDeviceLib', 'configWXDeviceWifi', 'sendDataToWXDevice', 'getWXDeviceInfos', 'onReceiveDataFromWXDevice','scanQRCode']//要调用的js函数，必须把函数名字写入数组
	    });
	};
})(fun);



//事件----------------------------------------------------------------------------------------------------------------
/*$(function($){
	//配置js-sdk
	fun.wechatConfig();
	//启动蓝牙
	var openBluetooth = function(){

	};
	//绑定设备
	var bindDevice = function(){
		wx.ready(function(){
			wx.scanQRCode({
			    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			    success: function (res) {
			    	var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				}
			});
		});
	};
	//解绑设备
	var unbindDevice = function(){

	};
	//设备状态
	var deviceState = function(){

	};
	//设备关机
	var closeDevice = function(){

	};
	//设备开机
	var startDevice = function(){

	};
	//重启设备
	var restartDevice = function(){

	};
	$(".bd").bind("click","a",function(){
		var st = $(this).attr("data-action");
		switch(st){
			case "openBluetooth" :
				openBluetooth();
				break;
			case "bindDevice" :
				bindDevice();
				break;
			case "unbindDevice" :
				unbindDevice();
				break;
			case "deviceState" :
				deviceState();
				break;
			case "closeDevice" :
				closeDevice();
				break;
			case "startDevice" :
				startDevice();
				break;
			case "restartDevice" :
				restartDevice
				break;
			default :
				break;
		}
	});
});*/