var publik = {};
var view = {};
var doList = {};



//publick fun
(function(_p){
	//menu
	_p.smallS = function(){
		return $(window).width() < 1200;
	};

	_p._event = function(){
		$(".menu").click(function(){
			$("nav").addClass("this-nav");
			$(".menu-zz").css({
				"display" : "block"
			});
		});
		$(".menu-zz").click(function(){
			$("nav").removeClass("this-nav");
			$(".menu-zz").css({
				"display" : "none"
			});
		});
	};

})(publik);


//controll view
(function(_v){
	/*_v.pageIndex = {
		init : function(){
			this.allways();
			//to top
		},
		allways : function(){

		},
		_event : function(){

		}
	};*/
	_v.pageLog = {
		init : function(){
			this.allways();
			//to top

		},
		allways : function(){
			$(".to-top-wrap").css({
				"left" : ($(window).width()-1200)/2+1120+"px",
				"display" : "block"
			});
		},
		_event : function(){
			var that = this;
			//to top
			$(".totop").click(function(){
				$('html,body').animate({scrollTop:0},700);
			});
			//window resize
			$(window).resize(function(){
				that.allways();
			});

			//feekback
			$(".feekback").click(function(){
				//feekback window
				$(".zz").fadeIn();

				$(".feedback-wrap").fadeIn();

			});

			//feekback cancel
			$(".cancel").click(function(){
				$("#fPhone").val("");
				$("#fWord").val("");
				$(".zz").fadeOut();

				$(".feedback-wrap").fadeOut();
			});

			//feekback save
			$(".save").click(function(){
				if($.trim($("#fWord").val()).length == 0){
					$("#fWord").css({
						"border" : "1px solid red"
					});

					return false;
				}

				if($.trim($("#fPhone").val()).length != 0 && !/^(1[0-9][0-9])\d{8}$/.test($.trim($("#fPhone").val()))){
					$("#fPhone").css({
						"border" : "1px solid red"
					});

					return false;
				}

				var _data = {
					versionCode : 1,
					versionType : 'Web',
					data: {
						userCode : '',
						content : $("#fWord").val(),
						type : 2,
						contact : $("#fPhone").val()
					},
					timeStamp : 1439780018397
				}

				$.ajax({
					url : "http://www.cume.cc:8888/PhotoCombAPI/Comment.json",
					type : 'POST',
					contentType : 'application/json',
					data : $.toJSON(_data),
					dataType : 'json',
					success : function(data) {
						console.log(data);
						$(".yes").show();

						var rfTimer = window.setInterval(function(){
							$("#fPhone").val("");
							$("#fWord").val("");
							$(".zz").fadeOut();
							$(".yes").hide();
							$(".feedback-wrap").fadeOut();
							window.clearInterval(rfTimer);
						}, 1000);
					},
					error:function(){

					}
				});
			});

			//
			$("#fWord").focus(function(){
				$("#fWord").css({
					"border" : "1px solid #ccc"
				});
			});
			$("#fPhone").focus(function(){
				$("#fPhone").css({
					"border" : "1px solid #ccc"
				});
			});
		}
	};


	_v.pagefaq = {
		init : function(){
			this.allways();
			//to top

			$(".cume-faq").myScroller();

		},
		allways : function(){

		},
		_event : function(){

		}

	}

	_v.pageProtocol = {
		init : function(){
			this.allways();
			//to top

			$(".cume-faq").myScroller();

		},
		allways : function(){

		},
		_event : function(){

		}

	}

	_v.pageFeedback = {
		init : function(){
			this.allways();
			//to top

		},
		allways : function(){

		},
		_event : function(){
			$(".c-bnt").click(function(){
				if(!$.trim($("#requestContent").val())){
					$(".red-1").show();
					$("#requestContent").css({
						"border" : "1px solid #ff440b"
					});
					return false;
				}

				if($.trim($("#contactNum").val())){
					if(!/^(1[0-9][0-9])\d{8}$/.test($.trim($("#contactNum").val()))){
						$(".red-2").show();
						$("#contactNum").css({
							"border" : "1px solid #ff440b"
						});
						return false;
					}
				}


				var _data = {
					versionCode : 1,
					versionType : 'Web',
					data: {
						userCode : '',
						content : $("#requestContent").val(),
						type : 2,
						contact : $("#contactNum").val()
					},
					timeStamp : 1439780018397
				}

				$.ajax({
					url : "http://www.cume.cc:8888/PhotoCombAPI/Comment.json",
					type : 'POST',
					contentType : 'application/json',
					data : $.toJSON(_data),
					dataType : 'json',
					success : function(data) {
						console.log(data);
						$("#requestContent").val("");
						$("#contactNum").val("");
						$(".yes").show();
						var rfTimer = window.setInterval(function(){
							$(".yes").hide();
							window.clearInterval(rfTimer);
						}, 3000);
					},
					error:function(){

					}
				});

			});

			$("#requestContent").focus(function(){
				$(".red-1").hide();
				$("#requestContent").css({
					"border" : "1px solid #d9d9d9"
				});
			});

			$("#contactNum").focus(function(){
				$(".red-2").hide();
				$("#contactNum").css({
					"border" : "1px solid #d9d9d9"
				});
			});
		}
	}

})(view);



//action
(function(_d){
	_d.logDoing = function(){
		view.pageLog._event();
		view.pageLog.init();
	};
	_d.faqDoing = function(){
		view.pagefaq._event();
		view.pagefaq.init();
	};
	_d.protocolDoing = function(){
		view.pageProtocol._event();
		view.pageProtocol.init();
	};
	_d.feedbackDoing = function(){
		view.pageFeedback._event();
		view.pageFeedback.init();
	};

})(doList);



//init
$(function(){
	//menu
	publik._event();
	var page = $("body").attr("data-page");
	switch(page){
		case "log":
			doList.logDoing();
		break;
		case "faq":
			doList.faqDoing();
		break;
		case "protocol":
			doList.protocolDoing();
		break;
		case "feedback":
			doList.feedbackDoing();
		break;




	}
});