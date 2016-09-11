var publik = {};
var view = {};
var doList = {};



//publick fun
(function(_p){
	_p.smallS = function(){
		return $(window).width() < 1200;
	};

	_p._event = function(){
		$(".soon").click(function(){
			$(".popup").fadeIn();
		});
		$(".popup-bnt").click(function(){
			$(".popup").fadeOut();
		});
		//nav
		$(".cs").click(function(){
			$(this).toggleClass("op");
		});
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
	_v.pageIndex = {
		init : function(){
			this.allways();

		},
		allways : function(){
			//控制
			if(publik.smallS()){
				$(".banner").height($(window).width() * 0.9 * 0.7 *0.8);
			}else{
				$(".banner").height(600);
			}

		},
		_event : function(){
			var that = this;
			$(window).resize(function(){
				that.allways();
			});
		}
	};

	_v.pageAbout = {
		init : function(){

		},
		allways : function(){

		},
		_event : function(){
			$(".hr-wrap").tap();
			$(".tap-bnt").on("click","li",function(){
				$(".this-tap").removeClass("this-tap");
				$(this).addClass("this-tap");
				$(".address-map").hide();
				$(".address-"+($(this).index()+1)+"-map").fadeIn();
			});

			$(".c-bnt").click(function(){
				if(!$.trim($("#requestContent").val())){
					$(".red-1").show();
					$("#requestContent").css({
						"border" : "1px solid #ff440b"
					});
					return false;
				}

				if($.trim($("#contactNum").val())){
					if(!/^1[3,4,5,8]\d{9}$/.test($.trim($("#contactNum").val()))){
						$(".red-2").show();
						$("#contactNum").css({
							"border" : "1px solid #ff440b"
						});
						return false;
					}
				}
				if(!$.trim($("#contactNum").val())){
					$(".red-3").show();
					$("#contactNum").css({
						"border" : "1px solid #ff440b"
					});
					return false;
				}

				if(!$.trim($("#contactNum").val())){
					$(".red-2").show();
					$("#contactNum").css({
						"border" : "1px solid #ff440b"
					});
					return false;
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
						}, 2000);
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
	_d.indexDoing = function(){
		view.pageIndex._event();
		view.pageIndex.init();
	};
	_d.aboutDoing=function(){
		view.pageAbout._event();
	};
})(doList);





//init
$(function(){
	//menu
	publik._event();
	var page = $("body").attr("data-page");
	switch(page){
		case "index":
			doList.indexDoing();
		break;
		case "about":
			doList.aboutDoing();
		break;

	}
});