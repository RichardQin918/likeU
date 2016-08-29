var config = {};
var _event = {};
var view = {};
var base_url = "http://wyxj.cume.cc/websiteapi";
var page_url = "http://wyxj.cume.cc/website";
var wxc = {
	appId: "wx514e48bb0f27f3fd"
};
var _public = {};

var downloadUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.cm.photocomb";



//配置
(function(_c){
	//题目
	_c.questions = [
		{
			id: 1,
			isRadio: true,
			title: "1.Facein界面给你的感觉（单选）？",
			answers: [
				'我没用过，不清楚',
				'99分，多一分怕你骄傲',
				'一般般，少了点气质',
				'无所谓，主要看内涵'
			]
		},
		{
			id: 2,
			isRadio: true,
			title: "2.Facein的功能提示给你的感觉（单选）？",
			answers: [
				'我没用过，不造你在说啥',
				'1+1=2的感觉，简明易懂',
				'某些图标感觉，呵呵不造神马鬼',
				'某些功能提示搞不懂，是我智商低还是产品有问题',
				'看得我尴尬症都犯了，回炉重造吧！'
			]
		},
		{
			id: 3,
			isRadio: false,
			title: "3.你最喜欢哪些功能（多选）？",
			answers: [
				'照片分类，照片辣么多，自己整理辣么累',
				'人脸识别找人，妈妈再也不用担心我找不到照片了',
				'私密相册，小秘密太多要藏不住辣',
				'智能筛选重复，谁来拯救我的渣技术',
				'人像魔镜，简直不要太懂我的颜值好吗',
				'百变大咖秀，换脸什么的太好玩了'
			]
		},
		{
			id: 4,
			isRadio: false,
			title: "4.你还需要哪些其他的功能（多选）？",
			answers: [
				'美颜，化妆，可以省下一整套化妆品的钱',
				'滤镜，怀旧复古LOMO风一网打尽',
				'水印，记录心情时间地点，文艺到不要不要的',
				'拼图，各种美美的相框相纸，拍杂志封面即视感',
				'备份，头发不能油照片也不能丢',
				'生成旅游相集，没有对象也能整理出美美的相集',
				'制作音乐相册，听说音乐和照片更配哦'
			]
		},
		{
			id: 5,
			isRadio: true,
			title: "5.你觉得我们家的人脸识别功能肿么样（单选）？",
			answers: [
				'咦，有这功能吗？',
				'太不准啦，快赶上800度近视了',
				'还行吧，可以接受',
				'棒棒哒！'
			]
		},
		{
			id: 6,
			isRadio: true,
			title: "6.你觉得我家Facein有什么问题（单选）？",
			answers: [
				'没用过，没机会发现问题',
				'照片很多，整理完简直像过了一世纪',
				'程序反应很慢，和雷电有得一拼',
				'还行吧，没什么明显的感觉',
				'很赞很强大哟'
			]
		},
		{
			id: 7,
			isRadio: false,
			title: "7.你经常拍摄的东西是（多选）？",
			answers: [
				'吃货以晒美食为乐',
				'驴友为拍美景而活',
				'辣妈奶爸，当然是要拍我家萌娃了',
				'自拍自拍自拍，重要的事情说三遍'
			]
		},
		{
			id: 8,
			isRadio: false,
			title: "8.关于照片存储，你经常怎么处理（多选）？",
			answers: [
				'直接存手机，容量大就是任性',
				'存电脑，看得见摸得着心里踏实',
				'存云端，wifi在手说走就走',
				'存移动硬盘，人有多大胆就有多大盘',
				'多了就删掉，人生总要有舍有得'
			]
		},
		{
			id: 9,
			isRadio: true,
			title: "9.你目前使用的手机是？",
			answers: [
				'苹果',
				'三星',
				'华为',
				'小米',
				'魅族',
				'VIVO、OPPO',
				'都不是呵呵哒'
			]
		},
		{
			id: 10,
			isRadio: true,
			title: "10.给我家Facein想句广告语，或者把你对Facein的建议告诉我们吧！",
			answers: []
		}
	];

	_c.answers = [
		{
			qusestionId: 0,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 1,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 2,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 3,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 4,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 5,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 6,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 7,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 8,
			answer:"",
			isAnswer: false
		},
		{
			qusestionId: 9,
			answer:"",
			isAnswer: false
		}
	]

	//接口
	_c.api = {
		submitAnswer_url: base_url + "/PhotoCombAPI/v2/question/submit.json", //提交答案给服务器
		like_url: base_url + "/PhotoCombAPI/v2/question/up.json", //点赞
		getAssess_url: base_url + "/PhotoCombAPI/v2/question/adviceDetails.json", //H5有奖问卷：用户建议详情查询接口
		getJsConfig_url: "http://www.cume.cc/game/getJsConfig", //获取js-sdk签名
		getRank_url: base_url + "/PhotoCombAPI/v2/question/rank.json", //获取排行榜
		submitPhone_url: base_url + "/PhotoCombAPI/v2/question/saveMobile.json", //提交电话号码
		statistic_url: base_url + "/PhotoCombAPI/v2/web/share.json" //统计
	};


})(config);


//公共方法
(function(_p){
	_p.statistic = function(_data){//统计
		$.ajax({
			type: 'POST',
			async: false,
			dataType : 'json',
			contentType : 'application/json',
			url: config.api.statistic_url + "?v=" + new Date().getTime(),
			data: $.toJSON(_data),
			success: function(res){
				console.log(res);
			}
		});
	};
	_p.getQueryString = function(name) {//获取url参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null;
	};
	_p.jsSdkConfig = function(userInfo,isEnd){
		var that = this;
		var sign = "";
		//配置js-sdk签名
		$.ajax({
            url: config.api.getJsConfig_url + "?_url=" + window.location.href,
            async: false, //请求是否异步，默认为异步，这也是ajax重要特性
            type: "GET",
            success: function (req) {
                console.log(req);
                sign = req;
            }
        });
		wx.config({
			beta: true,
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: sign.appId, // 必填，公众号的唯一标识
			timestamp: sign.timestamp, // 必填，生成签名的时间戳
			nonceStr: sign.nonceStr, // 必填，生成签名的随机串
			signature: sign.signature,// 必填，签名，见附录1
			jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']//要调用的js函数，必须把函数名字写入数组
		});
		wx.ready(function(){
			wx.onMenuShareTimeline({
			    title: 'Facein有奖问卷', // 分享标题
			    link: page_url + '/gamePage/question/share?_openId=' + userInfo.openid, // 分享链接
			    imgUrl: page_url + '/game/images/question/gg.png', // 分享图标
			    success: function () { 
			    	$(".phone-tip").fadeOut();
			        // 用户确认分享后执行的回调函数
			        if(isEnd){
			        	window.location.href = page_url + '/gamePage/question/write';
			        }
			        //记录分享数量
					var _data = { 
						versionType: "web",
						data: {
								"activityCode" : 3,
								"pagePv" : null,
								"shareNum" : 1,
								"shareLinkHitsNum" : 0,
								"hitsNum" : 0
							},
						extend: {}
					};
					that.statistic(_data);
			    },
			    cancel: function () {
			    	$(".phone-tip").fadeOut();
			        // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareAppMessage({
			    title: 'Facein有奖问卷', // 分享标题
			    desc: '答题卡点赞数最高前三位可获得价值￥769的手机照片打印机一台（LG PD239）。', // 分享描述
			    link: page_url + '/gamePage/question/share?_openId=' + userInfo.openid, // 分享链接
			    imgUrl: page_url + '/game/images/question/gg.png', // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			    	$(".phone-tip").fadeOut();
			        // 用户确认分享后执行的回调函数
			        if(isEnd){
			        	window.location.href = page_url + '/gamePage/question/write';
			        }

			        //记录分享数量
					var _data = { 
						versionType: "web",
						data: {
								"activityCode" : 3,
								"pagePv" : null,
								"shareNum" : 1,
								"shareLinkHitsNum" : 0,
								"hitsNum" : 0
							},
						extend: {}
					};
					that.statistic(_data);
			    },
			    cancel: function () {
			    	$(".phone-tip").fadeOut();
			        // 用户取消分享后执行的回调函数
			    }
			});
		});
	};
	_p.isIos = function(){
		var ua = navigator.userAgent.toLowerCase();	
		if (/iphone|ipad|ipod/.test(ua)) {
			return true;   	
		} else if (/android/.test(ua)) {
			return false; 	
		}
	};
})(_public);


//事件
(function(_e){
	_e.eventWrite = {
		sendPhone: function(){
			$(".send-phone").click(function(){
				if($.trim($("#text").val()).length == 0){
					$(".tip").fadeIn();
					$(".tip-container p").text("请输入您的电话号码");
					return false;
				}
				if(!/^1[3|4|5|7|8]\d{9}$/.test($.trim($("#text").val()))){
					$(".tip").fadeIn();
					$(".tip-container p").text("请输入正确的电话号码");
					return false;
				}
				$(".spinner").show();
				var userInfo = JSON.parse(localStorage.getItem("YInfo"));
				var _data = { 
					versionType: "web",
					data: {
							openid : userInfo.openid,
							mobile : $.trim($("#text").val())
						},
					extend: {}
				};
				$.ajax({
					type: 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url: config.api.submitPhone_url + "?v=" + new Date().getTime(),
					data: $.toJSON(_data),
					success: function(res){
						$(".spinner").hide();
						if(res.code == 1){
							$(".tip").fadeIn();
							$(".tip-container p").text("提交成功");
						}else{
							$(".tip").show();
							$(".tip-container p").text(res.info);
						}
					},
					error: function(e){
						$(".spinner").hide();
						$(".tip").show();
						$(".tip-container p").text("网络出错");
					}
				});
			});
		},
		eventInit: function(){
			this.sendPhone();
			$(".close").click(function(){
				$(".tip").fadeOut();
			});
		}
	};
	_e.eventRank = {
		toDetail: function(){
			$(".answer-body").on('click','.answer-item',function(){
				var openId = $(this).attr("data-openid");
				window.location.href = page_url + "/gamePage/question/share?_openId=" + openId;
			});
		},
		eventInit: function(){
			this.toDetail();	
		}
	};
	_e.eventIndex = {
		getRule: function(){
			$(".index-bnt-3").click(function(){
				$(".rule").fadeIn();
			});
			$(".rule").click(function(){
				$(".rule").fadeOut();
			});
		},
		close: function(){
			$(".close").click(function(){
				window.location.href = page_url + "/gamePage/question/end";
			});
		},
		clickDownload: function(){
			$(".index-bnt-1").click(function(){
				//记录下载
				var _data = { 
					versionType: "web",
					data: {
							"activityCode" : 3,
							"pagePv" : null,
							"shareNum" : 0,
							"shareLinkHitsNum" : 0,
							"hitsNum" : 1
						},
					extend: {}
				};
				_public.statistic(_data);
				window.location.href = downloadUrl;

				return false;
			});
		},
		eventInit: function(){
			this.getRule();
			this.close();
			this.clickDownload();
		}
	};
	_e.eventAnswer = {
		nextQuestion: function(){//下一题
			$(".answer-bnt-2").click(function(){
				if(view.pageAnswer.questionIndex ==  9) return false;
				if(!config.answers[view.pageAnswer.questionIndex].isAnswer){
					$(".tip-container p").text("请您先答完这题");
					$(".tip").fadeIn();
					return false;
				}
				view.pageAnswer.nextQuestion();
				return false;
			});
		},
		preQuestion: function(){//上一题
			$(".answer-bnt-1").click(function(){
				if(view.pageAnswer.questionIndex ==  0) return false;
				view.pageAnswer.preQuestion();
				return false;
			});

		},
		answer: function(){//答题
			$(".answer-body").on("click",".answer-item",function(){
				var answer = "";
				var isAnswer = false;
				if(config.questions[view.pageAnswer.questionIndex].isRadio){
					//单选
					$(".this-item").removeClass("this-item");
					if($(this).hasClass("this-item")){
						$(this).removeClass("this-item");
					}else{
						$(this).addClass("this-item");
					}
					answer = $(this).index() + 1;
					isAnswer = true;
				}else{
					if($(this).hasClass("this-item")){
						$(this).removeClass("this-item");
					}else{
						$(this).addClass("this-item");
					}	
					//多选
					$(".this-item").each(function(){
						answer += $(this).index() + 1 + ",";
					});
					answer = answer.substring(0,answer.length-1);
					if(answer){
						isAnswer = true;
					}else{
						isAnswer = false;
					}
				}

				//填入答案
				config.answers[view.pageAnswer.questionIndex].answer = answer;
				config.answers[view.pageAnswer.questionIndex].isAnswer = isAnswer;
			});
		},
		_submit: function(){
			$(".answer-bnt-3").click(function(){
				$(".spinner").show();
				config.answers[9].answer = $("#text").val();
				localStorage.setItem("text",$("#text").val());
				config.answers[9].isAnswer = true;
				if($.trim($("#text").val()).length == 0){
					$(".tip").show();
					$(".tip-container p").text("请输入您对我们的建议或广告语");
					return false;
				}
				if((config.answers[0].answer+"").indexOf("1")>-1 || 
					(config.answers[1].answer+"").indexOf("1")>-1 ||
					(config.answers[4].answer+"").indexOf("1")>-1 ||
					(config.answers[5].answer+"").indexOf("1")>-1){
					$(".tip-2 .tip-container p").text("根据你的回答，发现你并没有使用Facein哦");
					$(".tip-2").fadeIn();
					$(".restart").show();
					$(".close").hide();
					return false;
				}
				//提交给服务器
				var userInfo = JSON.parse(localStorage.getItem("YInfo"));
				var _data = {
					versionType: "web",
					data: {
						openid: userInfo.openid,
						headImg: userInfo.headimgurl,
						username: userInfo.nickname,
						userType: 1,
						questionList: []
					}
				};
				
				for(var j=0;j<config.answers.length;j++){
					var question = {
						questionSerial: config.answers[j].qusestionId,
						questionAnswer: config.answers[j].answer,
						questionType:1
					};
					_data.data.questionList.push(question);
				}
				console.log(_data);
				$.ajax({
					type: 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url: config.api.submitAnswer_url + "?v=" + new Date().getTime(),
					data: $.toJSON(_data),
					success: function(res){
						$(".spinner").hide();
						if(res.code == 1){
							//跳到结果页面
							window.location.href = page_url + "/gamePage/question/end";
							localStorage.setItem("isplay",1);
						}else{
							$(".tip").show();
							$(".tip-container p").text(res.info);
						}
					},
					error: function(e){
						$(".spinner").hide();
						$(".tip").show();
						$(".tip-container p").text("网络出错");
					}
				});
			});
		},
		errorTip: function(){
			$(".close").click(function(){
				$(".tip").fadeOut();
				$(".tip-2").fadeOut();
			});
			$(".restart").click(function(){
				$(".tip").fadeOut();
				$(".tip-2").fadeOut();
				$(".restart").hide();
				$(".close").show();
				$(".tip").fadeOut();
				$(".spinner").hide();
				view.pageAnswer.questionIndex = 0;
				view.pageAnswer.init();
				$(".answer-bnt-2").show();
				$(".answer-bnt-3").hide();
			});
		},
		downloadClick: function(){
			$(".download").click(function(){
				//记录下载
				var _data = { 
					versionType: "web",
					data: {
							"activityCode" : 3,
							"pagePv" : null,
							"shareNum" : 0,
							"shareLinkHitsNum" : 0,
							"hitsNum" : 1
						},
					extend: {}
				};
				_public.statistic(_data);
				window.location.href = downloadUrl;

				return false;
			});
		},
		eventInit: function(){
			this.nextQuestion();
			this.preQuestion();
			this.answer();
			this.errorTip();
			this._submit();
			this.downloadClick();
		}
	};
	_e.eventEnd = {
		like: function(){
			$(".xin").one("click",function(){
				var userInfo = JSON.parse(localStorage.getItem("YInfo"));
				var _data = { 
						versionType:"web",
						data: {
							openid: userInfo.openid,
							otherOpenid: userInfo.openid,
							username: userInfo.nickname,
							questionType: 1
							},
						extend: {}
				};
				$.ajax({
					type: 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url: config.api.like_url + "?v=" + new Date().getTime(),
					data: $.toJSON(_data),
					success: function(res){
						if(res.code == 1){
							if(res.data.status == 1){
								$(".xin-num").text(Number($(".xin-num").text()) + 1);
							}else{
								$(".tip").fadeIn();
								$(".tip-container p").text("每人只能点赞一次");
							}
							$(".xin").addClass("xined");
							
						}
					}
				});
			});
		},
		toShare: function(){
			$(".share").click(function(){
				//判断是ios还是安卓
				if(_public.isIos){//ios
					$(".ios-tip").fadeIn();
				}else{//android
					$(".android-tip").fadeIn();
				}
				return false;
			});
			$(".phone-tip").click(function(){
				$(".phone-tip").fadeOut();
			});
		},
		_close: function(){
			$(".close").click(function(){
				$(".tip").fadeOut();
			});
		},
		eventInit: function(){
			this.like();
			this.toShare();
			this._close();
		}
	};
	_e.eventShare = {
		like: function(){
			$(".xin").one("click",function(){
				var userInfo = JSON.parse(localStorage.getItem("YInfo"));
				var _data = { 
						versionType:"web",
						data: {
							openid: localStorage.getItem("myOpenId"),
							otherOpenid: JSON.parse(localStorage.getItem("YouInfo")).openid,
							username: localStorage.getItem("myName"),
							questionType: 1
							},
						extend: {}
				};
				$.ajax({
					type: 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url: config.api.like_url + "?v=" + new Date().getTime(),
					data: $.toJSON(_data),
					success: function(res){
						if(res.code == 1){
							if(res.data.status == 1){
								$(".xin-num").text(Number($(".xin-num").text()) + 1);
							}else{
								$(".tip").fadeIn();
								$(".tip-container p").text("每人只能点赞一次");
							}
							$(".xin").addClass("xined");
						}
					}
				});
			});
		},
		eventInit: function(){
			this.like();
		}
	};
})(_event);


//页面
(function(_v){
	_v.pageWrite = {
		init: function(){

		}
	};
	_v.pageRank = {
		init: function(){
			var that = this;
			//css
			$(".rank-container").css("padding-top",$(window).width()*0.38);
			//获取排行榜
			$(".spinner").show();
			var _data = { 
				versionType: "web",							
				data: {},
				extend: {}
			};
			$.ajax({
				type: 'POST',
				dataType : 'json',
				contentType : 'application/json',
				url: config.api.getRank_url + "?v=" + new Date().getTime(),
				data: $.toJSON(_data),
				success: function(res){
					$(".spinner").hide();
					if(res.code == 1){
						that.render(res.data);
						console.log(res);
					}else{
						$(".spinner").hide();
						alert("网络出错");
					}
				},
				error: function(e){
					$(".spinner").hide();
					alert("网络出错");
				}
			});
		},
		render: function(data){
			var nodes = [];
			for(var i=0;i<data.length;i++){
				var node = '<div class="answer-item fl" data-openId="'+data[i].openid+'">'+
								'<div class="fw">'+
									'<img class="fl" src="../../game/images/question/'+(i<3?"rank-li-top":"rank-li-top-2")+'.png" alt="">'+
								'</div>'+
								'<div class="'+(i<3?"answer-t-center":"answer-t-center-2")+' answer-tt">'+
									'<ul class="fw rank-table rank-table-1">'+
										'<li class="fl">'+(i+1)+'</li>'+
										'<li class="fl"><img src="'+data[i].headImg+'" class="tou" alt=""></li>'+
										'<li class="fl">'+data[i].username+'</li>'+
										'<li class="fl"><div class="xin xined"></div>'+data[i].upNum+'</li>'+
									'</ul>'+
								'</div>'+
								'<div class="fw">'+
									'<img class="fl" src="../../game/images/question/'+(i<3?"rank-li-bottom":"rank-li-bottom-2")+'.png" alt="">'+
								'</div>'+
							'</div>';
				nodes.push(node);
			}
			$(".answer-body").html(nodes);

			$(".rank-table-1 li").css({
				"height": $(window).width() * 0.138,
				"line-height": $(window).width() * 0.138 + "px"
			});
		}
	};
	_v.pageIndex = {
		init: function(){
			$(".rule-img").css("top",($(window).height()-$(window).width()*0.91)/2);
			if(localStorage.getItem("isplay") == 1){
				$(".tip").show();
				$(".tip-container p").text("您已经参加了答题");
				$(".tip-container a").text("去查看");
			}
		}
	};
	_v.pageAnswer = {
		questionIndex : 0,
		templet: '<div class="answer-item fl">'+
					'<div class="fw">'+
						'<img class="fl" src="../../game/images/question/answer-t-top.png" alt="">'+
					'</div>'+
					'<div class="answer-t-center dddd">'+
						'<div class="answer-text">'+
							'{0}'+
						'</div>'+
					'</div>'+
					'<div class="fw">'+
						'<img class="fl" src="../../game/images/question/answer-t-bottom.png" alt="">'+
					'</div>'+
				'</div>',
		lastAnswerTemplet: '<div class="answer-item-s fl">'+
								'<div class="fw">'+
									'<img class="fl" src="../../game/images/question/answer-t-top.png" alt="">'+
								'</div>'+
								'<div class="answer-t-center answer-tt">'+
									'<div class="answer-input">'+
										'<textarea placeholder="请输入您对我们的建议或广告语" name="" id="text"></textarea>'+
									'</div>'+
								'</div>'+
								'<div class="fw">'+
									'<img class="fl" src="../../game/images/question/answer-t-bottom.png" alt="">'+
								'</div>'+
							'</div>',
		jTitle: $(".title h2"),
		answerTemplet: {
			qusestionId: 0,
			answer:""
		},
		jComtainer: $(".answer-body"),
		jQuestionIndex: $(".question-index"),
		init: function(){
			if($(".myInfo").val()){
				localStorage.setItem("YInfo",$(".myInfo").val());
			}
			//获取用户信息
			if(!localStorage.getItem("YInfo")){
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wxc.appId+"&redirect_uri="+page_url+"/gamePage/question/answer&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
			}

			this.setQuestion();
		},
		setQuestion: function(){
			var question = config.questions[this.questionIndex];
			this.jTitle.text(question.title);//题目
			this.jQuestionIndex.text(this.questionIndex + 1);//第几题
			if(this.questionIndex<=8){//前8题
				var questionNode = "";
				for(var i=0;i<question.answers.length;i++){
					if(question.isRadio){
						questionNode += this.templet.replace("{0}",question.answers[i]);
					}else{
						questionNode += this.templet.replace("{0}",question.answers[i]).replace("dddd","answer-t-center-3");
					}
					
				}
				this.jComtainer.html(questionNode);//答案
				//填上上次搭的答案
				var answer = config.answers[this.questionIndex].answer;
				if(answer.length == 0) return false;
				answer = answer + "";
				if(answer.indexOf(",")<0){
					$(".answer-item").eq(answer-1).addClass("this-item");
					return ;
				}else{
					answer = answer.split(',');
					console.log(answer);
					for(var i = 0;i < answer.length;i++){
						$(".answer-item").eq(answer[i]-1).addClass("this-item");
					}
				}
			}else{
				this.jComtainer.html(this.lastAnswerTemplet);//答案
				$("#text").val(config.answers[this.questionIndex].answer);
			}
			
		},
		nextQuestion: function(){
			this.questionIndex++;
			if(this.questionIndex == 9){
				$(".answer-bnt-2").hide();
				$(".answer-bnt-3").show();
			}
			this.setQuestion();
		},
		preQuestion: function(){
			if(this.questionIndex == 9){
				config.answers[this.questionIndex].answer = $("#text").val();
			}
			this.questionIndex--;
			if(this.questionIndex != 9){
				$(".answer-bnt-2").show();
				$(".answer-bnt-3").hide();
			}
			this.setQuestion();
		}
	};
	_v.pageEnd = {
		init: function(){
			$(".end-container h2").css("padding-bottom",$(window).width()*0.216+"px");
			$(".end-tt p").text(localStorage.getItem("text"));
			var userInfo = JSON.parse(localStorage.getItem("YInfo"));
			$(".end-tou img").attr("src",userInfo.headimgurl);
			$(".user-name").text(userInfo.nickname);

			if(localStorage.getItem("isplay") == 1){//已经答题
				var _data = { 
						versionType: "web",
						data: {
							openid : userInfo.openid,
							questionType : 1
						},
						extend: {}
					};
				$.ajax({
					type: 'POST',
					dataType : 'json',
					contentType : 'application/json',
					url: config.api.getAssess_url + "?v=" + new Date().getTime(),
					data: $.toJSON(_data),
					success: function(res){
						console.log(res);
						$(".spinner").hide();
						if(res.code == 1){
							//跳到结果页面
							$(".end-tt p").text(res.data.questionContent);
							$(".tou").attr("src",res.data.headImg);
							$(".xin-num").text(res.data.upNum);
							$(".rank").text(res.data.rank);
							$(".user-name").text(res.data.username);
							localStorage.setItem("myName",res.data.username);
						}else{
							$(".spinner").hide();
							alert("网络出错");
						}
					},
					error: function(e){
						alert("网络出错");
					}
				});

			}

			_public.jsSdkConfig(userInfo,true);
			
		}
	};
	_v.pageShare = {
		init: function(){
			//记录打开分享数
			var _data = { 
				versionType: "web",
				data: {
						"activityCode" : 3,
						"pagePv" : null,
						"shareNum" : 0,
						"shareLinkHitsNum" : 1,
						"hitsNum" : 0
					},
				extend: {}
			};
			this.statistic(_data);
			$(".end-container h2").css("padding-bottom",$(window).width()*0.216+"px");
			//loading
			$(".spinner").show();
			localStorage.setItem("myOpenId",_public.getQueryString("_openId"));
			//获取用户信息
			if($(".myInfo").val()){
				localStorage.setItem("YouInfo",$(".myInfo").val());
				localStorage.setItem("YInfo",$(".myInfo").val());
			}
			//获取用户信息
			if(!localStorage.getItem("YouInfo")){
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+wxc.appId+"&redirect_uri="+page_url+"/gamePage/question/share?_openId="+_public.getQueryString("_openId")+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
			}

			if(localStorage.getItem("YInfo") && _public.getQueryString("_openId") == JSON.parse(localStorage.getItem("YInfo")).openid){
				window.location.href = page_url+"/gamePage/question/end";
			}

			var _data = { 
					versionType: "web",
					data: {
						openid : _public.getQueryString("_openId"),
						questionType : 1
					},
					extend: {}
				};
			$.ajax({
				type: 'POST',
				dataType : 'json',
				contentType : 'application/json',
				url: config.api.getAssess_url + "?v=" + new Date().getTime(),
				data: $.toJSON(_data),
				success: function(res){
					console.log(res);
					$(".spinner").hide();
					if(res.code == 1){
						//跳到结果页面
						$(".end-tt p").text(res.data.questionContent);
						$(".tou").attr("src",res.data.headImg);
						$(".xin-num").text(res.data.upNum);
						$(".rank").text(res.data.rank);
						$(".user-name,.f-name").text(res.data.username);
						localStorage.setItem("myName",res.data.username);
					}else{
						$(".spinner").hide();
						alert("网络出错");
					}
				},
				error: function(e){
					alert("网络出错");
				}
			});
			//配置分享
			//配置js-sdk签名
			var userInfo = JSON.parse(localStorage.getItem("YInfo"));
			_public.jsSdkConfig(userInfo);
		}
	};
})(view);

//初始化
$(function(){
	var className = $("html").attr("class");

	//记录pv
	var _data = { 
		versionType: "web",
		data: {
				"activityCode" : 3,
				"pagePv" : className,
				"shareNum" : 0,
				"shareLinkHitsNum" : 0,
				"hitsNum" : 0
			},
		extend: {}
	};
	_public.statistic(_data);
	switch(className){
		case "index":
			view.pageIndex.init();
			_event.eventIndex.eventInit();
			break;
		case "rank":
			view.pageRank.init();
			_event.eventRank.eventInit();
			break;
		case "answer":
			view.pageAnswer.init();
			_event.eventAnswer.eventInit();
			break;
		case "end":
			view.pageEnd.init();
			_event.eventEnd.eventInit();
			break;
		case "share":
			view.pageShare.init();
			_event.eventShare.eventInit();
		case "write":
			view.pageWrite.init();
			_event.eventWrite.eventInit();
			break;
		default:
			break; 
	};
});