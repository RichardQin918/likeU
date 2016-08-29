$(document).ready(function() {
	// var i = 0;
	// while (localStorage.key(i) !== null){
	// 	var getKey = localStorage.key(i);
	// 	alert("this is the key value:" + localStorage.key(i));
	// 	alert("this is the value value :" + localStorage.getItem(getKey));
	// 	i++;
	// }
	if (!localStorage.getItem('myInfo') || JSON.parse(localStorage.getItem('myInfo')).nickname == undefined) {
		// alert("sit 2! localStorage cleaned up !");
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

	else {
		alert("sit 1! things are fine!");
	}

// alert("we r good to go!");
// alert(localstorage.getItem("myInfo")).nickname;

(function($){
			$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null) 
				return unescape(r[2]); return null;
			}
		})(jQuery);

var cue = $.getUrlParam('mode');
// alert("Oops!!");
// alert("this is cue:" + cue);

//存入（伪造） 到 localStorage数据
var creater = $.getUrlParam('creater');

var fakeInfo = {
	nickname: $("#fakeName").val(),
	headimgurl: $("#fakeHead").val(),
	openid: creater
};
localStorage.setItem("fakeInfo", JSON.stringify(fakeInfo));
// alert("this is fakeInfo!:" + localStorage.getItem('fakeInfo'));



//登陆渲染

//切换出题完成页面
	if (cue == "finishMake") {
		$("#share").css('display','block');
		$("#retry").css('display','block');
		$("#sharePage").attr('href', "/gamePage/likeU/start?mode=startAnswer&creater=" + creater);

		// alert($(".btn1").css('display'));
		if ( $("#nickname").val() == null){
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
	}




	//答题用户主页
	if (cue =="startAnswer"){
		$("#startAnswer").css('display','block');
		$("#creater").text(creater);
		$("#takeQ").attr('href', "/gamePage/likeU/make?mode=taker&openid=" + openid + "&creater=" + creater );

		makerInfo = JSON.parse(localStorage.getItem('makerInfo'));
		if (makerInfo !== 'undefined' ){
			var nickname = makerInfo.nickname;
			var head = makerInfo.headimgurl;
			$("#name").text('-' + nickname);
			$("#headimg").attr('src', head);
		}

	}	



	else{

		var myInfo = localStorage.getItem("myInfo");
		if (myInfo !== undefined){
			myInfo = JSON.parse(myInfo);
			var nickname = myInfo.nickname;
			var head = myInfo.headimgurl;
			var openid = myInfo.openid;
			$("#name").text("-" + nickname);
			$("#headimg").attr("src", head);
			// alert("this is headimgurl:" + $("#headimg").attr("src"));
			myInfo.need_login = "no";
			var need_login = myInfo.need_login;
			// alert("finish login and render:" + need_login);
		}

		
	}







	//模式



	//切换出题页面
	if (cue =="edit") {
		$("#edit").css('display','block');
	}





	//出题用户主页
	else if (cue == null) {
		$("#startMake").css('display', 'block');
	}
	
});
