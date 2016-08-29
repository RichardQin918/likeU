(function($){
			$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null) 
				return unescape(r[2]); return null;
			}
		})(jQuery);




$(document).ready(function() {
	var mode = $.getUrlParam('mode');
	var makerInfo = localStorage.getItem('makerInfo');
	makerInfo = JSON.parse(makerInfo);
	alert("this is creater Info!:" + JSON.stringify(makerInfo));
	var makerHead = makerInfo.headimgurl;
	var makerName = makerInfo.nickname;
	var makerOpenid = makerInfo.openid;
	var myInfo = localStorage.getItem('myInfo');
	myInfo = JSON.parse(myInfo);
	var headimg = myInfo.headimgurl;
	var name = myInfo.nickname;
	var prefix = '';
	var takerCommentList = [];
	var makerComment = '';
	var grade = $.getUrlParam("grade");

	var otherInfo = localStorage.getItem("otherInfo");
	otherInfo = JSON.parse(otherInfo);
	var otherGradeList = otherInfo.otherGrade;
	var otherNameList = otherInfo.otherName;
	var otherHeadList = otherInfo.otherHead;
	var otherCommentList = [];
	// var comment1 = '';
	// var fakeInfo = localStorage.getItem('fakeInfo');
	// fakeInfo = JSON.parse(fakeInfo);
	// var headimg = fakeInfo.headimgurl;
	// var name = fakeInfo.nickname;
	// alert("this is headimgurl!:" + headimg);
	var mark = parseFloat(grade);
	//出题人评论选择
	if(mark = 0){
		makerComment = '等会放学你别走，我们聊聊';
	}
	else if(mark <= 40){
		makerComment = '你还想让我说啥，我想静静..';
	}
	else if(mark <= 40){
		makerComment = '快说为什么没答对？ 我不听我不听！';
	}
	else if(mark <= 60){
		makerComment = '你不知道的我的另一面，赶紧私信撩我吧:)';
	}
	else if(mark <= 80){
		makerComment = '咱俩有缘，明天约不约';
	}
	else if(mark <= 100){
		makerComment = '我最喜欢你哦^ ^';
	}
	else{
		alert('no grade err!');
		return;
	}


	//答题评论选择
	for (i=0;i<otherGradeList.length;i++){
		if(parseFloat(otherGradeList[i]) <= 20 ){
			otherCommentList .push('刚才是我家猫玩儿的，你可千万别当真 *_*');
		}
		else if(parseFloat(otherGradeList[i]) <= 20 ){
			otherCommentList .push('咱俩友谊的小船..你还是自己划吧 T T');
		}
		else if (parseFloat(otherGradeList[i]) <= 40){
			otherCommentList .push('老师说交卷之前千万别改答案，但我没忍住..')
		}
		else if (parseFloat(otherGradeList[i]) <= 60){
			otherCommentList .push('看来')
		}
		else if (parseFloat(otherGradeList[i]) <= 80){
			otherCommentList .push('你的喜好我都知道，故意错一题怕你太骄傲:)')
		}
		else if (parseFloat(otherGradeList[i]) <= 100){
			otherCommentList .push('如果这都不算爱~')
		}
		else{
			alert('no grade err!');
			return;
		}
	}





	//渲染
	$("#MakerHeadimg").attr('src', makerHead);
	$("#MakerName").text('-' + makerName);


	
	alert("this is the grade:" + grade);  
	// grade = JSON.parse(grade);
	$("#grade").text(grade);
	$("#grade2").text(grade);

	$("#makerComment").text("你答对了我" + grade + "的题目" + makerComment); 


	
	// alert("this is the content:" + otherGradeList + otherNameList + otherHeadList + ',' + otherGradeList.length + ',' + otherHeadList.length);



	



	//添加评论
	// $("#commentList").append('<li id="newComment"></li>');
	// $("#newComment").append('<img id="TakerHeadimg" class = "reviewer">');
	// $("#commentList").append('<div class="others_grade"></div>');
	// $(".others_grade").append('<span id="grade2" ></span>');
	// $("#commentList").append('<h4 style="color:#bc8000" id="TakerName" ></h4>');
	// $("#commentList").append('<h5 style="color:#bc8000" id="TakerComments" ></h5>');
	// $("#commentList").append('<img src="../../game/images/likeU/main/divider.png" class="divider" alt="">');

	// $("#TakerHeadimg").attr('src', headimg);
	// $("#grade2").text(grade);
	// $("#TakerName").text(name);

	//添加其他玩家信息
	for (i=0;i<otherGradeList.length; i++){
		// while (otherGradeList[i] !== '' && i< ){
			$("#commentList").append('<li id="newComment"></li>');
			$("#newComment").append('<img id="TakerHeadimg" class = "reviewer">');
			$("#commentList").append('<div class="others_grade"></div>');
			$(".others_grade").append('<span id="grade2" ></span>');
			$("#commentList").append('<h4 style="color:#bc8000" id="TakerName" ></h4>');
			$("#commentList").append('<h5 style="color:#bc8000" id="TakerComments" ></h5>');
			$("#commentList").append('<img src="../../game/images/likeU/main/divider.png" class="divider" alt="">');

			$("#TakerHeadimg").attr('src', otherHeadList[i]);
			$("#grade2").text(otherGradeList[i]);
			$("#TakerName").text(otherNameList[i]);
			$("#TakerComments").text(otherCommentList[i]);
		// }
	}

	var openURL = prefix + "/gamePage/likeU/start?mode=startAnswer&creater=" + makerOpenid;
	var shareURL = window.location.href;
	$.ajax({
		type: "GET",
        contentType: "application/json; charset=utf-8",
        // dataType:'json',
        url: prefix + "/game/likeU/getWxConfig",//传入后台的地址/方法
        async: true,
        data: {"shareURL" : shareURL},//参数，这里是一个json语句
        success: function (data) {
            alert("this is returnning wxConfig:" + JSON.stringify(data) + typeof(data));

            //微信设置
            var wxConfig = JSON.stringify(data);
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

		    alert("this is weChatConfig:" + wxConfig);
		    alert("this is link:" + shareURL);
		    wx.ready(function(){
		        wx.onMenuShareTimeline({
		            title: makerName + '我最喜欢你',
		            link: openURL,
		            imgUrl: makerHead
		        });
		        wx.onMenuShareAppMessage({
		        	title: '快来和' + makerName + '一起玩吧，我最喜欢你！',
		        	desc: '来测一测， 我们友谊的小船会翻嘛？',
		            link: openURL,
		            imgUrl: makerHead,
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



});

