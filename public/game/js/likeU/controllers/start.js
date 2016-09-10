(function($){
			$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null) 
				return unescape(r[2]); return null;
			}
		})(jQuery);

function GetRequest() {
  
  var url = location.search; //get string in the url which is after "?"
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}



$(document).ready(function() {
	var i = 0;
	var cue = $.getUrlParam('mode');
	// alert("this is cue:" + cue);

	//input fake data into localstorage
	var creater = $.getUrlParam('creater');
	var prefix = '';
	var server = '';
	var ua = navigator.userAgent.toLowerCase();	
	if (/iphone|ipad|ipod/.test(ua)) {
		    server = 'ios';		
	} else if (/android/.test(ua)) {
		    server = 'android';
	}



	while (localStorage.key(i) !== null){
		var getKey = localStorage.key(i);
		// alert("this is the key value:" + localStorage.key(i));
		// alert("this is the value value :" + localStorage.getItem(getKey));
		i++;
	}
	if (!localStorage.getItem('myInfo') || JSON.parse(localStorage.getItem('myInfo')).nickname == undefined) {
		alert("sit 2! localStorage cleaned up !");
		// alert('start input');

		var myInfo = {
			nickname : $("#nickname").val(),
			headimgurl : $("#headimgurl").val(),
			openid : $("#openid").val(),
			sex : $("#sex").val(),
			need_login: "yes"
		};
		localStorage.setItem("myInfo",JSON.stringify(myInfo));
	// alert("input finished" + JSON.stringify(localStorage));
	}

	alert("now we are good to go !");
	


// alert("we r good to go!");
// alert(localstorage.getItem("myInfo")).nickname;



	//login render

	//finish making page
	if (cue == "finishMake") {
		$("#share").css('display','block');
		$("#retry").css('display','block');
		$("#sharePage").click(function(){
			if(server == 'ios'){
				$("#shareIos").css('display', 'block');
				$("#shareIos").click(function(){
					$("#shareIos").css('display', 'none');
				});
			}
			if(server == 'android'){
				$("#shareAndroid").css('display', 'block');
				$("#shareAndroid").click(function(){
					$("#shareAndroid").css('display', 'none');
				});
			}


		});
		// document.getElementById("shareClick").click(alert('请点击右上方分享'));

		// alert($(".btn1").css('display'));
		if ( $("#nickname").val() == undefined){
			alert("err ! no data to create maker!");
		}
		else {
			var makerInfo = {
					nickname : $("#nickname").val(),
					headimgurl : $("#headimgurl").val(),
					openid : $("#openid").val(),
					sex : $("#sex").val(),
					need_login: "yes"
				};
			localStorage.setItem("makerInfo",JSON.stringify(makerInfo));
		}

		myInfo = localStorage.getItem("myInfo");
		myInfo = JSON.parse(myInfo);
		var nickname = myInfo.nickname;
		var head = myInfo.headimgurl;

		var openURL = prefix + "/gamePage/likeU/start?mode=startAnswer&creater=" + creater;
		var shareURL = window.location.href;
		$.ajax({
			type: "GET",
            contentType: "application/json; charset=utf-8",
            // dataType:'json',
            url: prefix + "/game/likeU/getWxConfig",//send to backend location/function 
            async: false,
            data: {"shareURL" : shareURL},//json 
            success: function (data) {
                alert("this is returnning wxConfig:" + JSON.stringify(data));

                //wechat setting
                // var wxConfig = JSON.stringify(data);
                // data = JSON.parse(data);
                var debug = data.debug;
                // alert('this is debug!:' + debug);
                var appId = data.appId;
                var timestamp = data.timestamp;
                var nonceStr = data.nonceStr;
                var signature = data.signature;
                var jsApiList = ['onMenuShareTimeline','onMenuShareAppMessage'];
                alert('this is jsApiList:' + jsApiList);

			    wx.config({
			    	debug: debug,
					appId: appId,
					timestamp:timestamp,
					nonceStr:nonceStr,
					signature: signature,
					jsApiList: jsApiList
					});
			    
			    // alert("this is weChatConfig:" + wxConfig);
			    wx.ready(function(){
			        wx.onMenuShareTimeline({
			            title: urlname + '我最喜欢你',
			            link: openURL,
			            imgUrl: head
			        });

			        wx.onMenuShareAppMessage({
			        	title: '快来和' + urlname + '一起玩吧，我最喜欢你！',
			        	desc: '来测一测， 我们友谊的小船会翻嘛？',
			            link: openURL,
			            imgUrl: head,
			            type: 'link'
			        	
			        });
			    });

			    wx.error(function(res){
			    	alert('wx error!:' + JSON.stringify(res));
			    })


            },
            error: function (err) {
                alert("err:" + JSON.stringify(err));
            }
		});



	}




	//start answering page
	if (cue =="startAnswer"){
		// var temMaker = localStorage.getItem("temMaker");
		// alert("this is temMaker:" + JSON.stringify(temMaker));
		// if (temMaker !== null){
		// 	temMaker = JSON.parse(temMaker);
		// 	urlname = temMaker.name;
		// 	urlhead = temMaker.head;
		// }
		var Request = new Object();
		Request = GetRequest();
		urlname = decodeURI(Request['makerName']);
		alert("this is urlname:" + urlname);
		urlhead = $.getUrlParam('headimgurl');
		$("#startAnswer").css('display','block');
		$("#creater").text(creater);
		$("#takeQ").attr('href', prefix + "/gamePage/likeU/make?mode=taker&openid=" + openid + "&creater=" + creater );
		$('title').text('我们友谊的小船会翻嘛？');
		if (makerInfo !== 'undefined' ){
			var nickname = urlname;
			var creater = creater;
			var head = urlhead;
			// $("#name").text('-' + nickname);
			// $("#headimg").attr('src', head);
		
			
			var makerInfo = {
					nickname : nickname,
					headimgurl : head,
					openid : creater
				};
			alert("this is makerInfo !:" + JSON.stringify(makerInfo));
			localStorage.setItem("makerInfo",JSON.stringify(makerInfo));
		}
		else {
			alert('no makerInfo err!');
		}

	}


	//switch to making page
	if (cue =="edit") {
		$("#edit").css('display','block');
	}



	//start making page

	if(cue == null){
		alert("this is the title of the page:" + $('title').text());
		$("#startMake").css('display', 'block');
		var myInfo = localStorage.getItem("myInfo");
		if (myInfo !== undefined){
			myInfo = JSON.parse(myInfo);
			var nickname = myInfo.nickname;
			var head = myInfo.headimgurl;
			var openid = myInfo.openid;
			// $("#name").text("-" + nickname);
			// $("#headimg").attr("src", head);
			// alert("this is headimgurl:" + $("#headimg").attr("src"));
			myInfo.need_login = "no";
			var need_login = myInfo.need_login;
			$("#startMakePage").attr('href', prefix + 'gamePage/likeU/make?mode=maker&openid=' + openid);
			// alert("finish login and render:" + need_login);
		}
		
	}
	
	$("#name").text("-" + nickname);
	$("#headimg").attr("src", head);
	




});
