(function($){

	$.fn.myScroller = function(){
		return this.each(function(){
			var a=[];
			var init = function(){
				$(".faq-title").css({
					"right" : ($(window).width()-$(".cume-idea").width())/2 + "px",
					"height" : $(window).height() - 300,
					"top" : "150px",
					"width" : $(".cume-idea").width() * 0.23 + "px"
				});
				$(".faq-title .pr").css({
					"height" : $(window).height() - 300 - 40 + "px",
					"overflow" : "hidden",
					"margin-top" : "20px"
				});


				if($(".faq-title dl").height()>$(".faq-title .pr").height()+40){
					$(".next").css({
						"opacity" : 1
					});
				}
				$(".scoller-item").each(function(){
					a.push($(this).offset().top)
				});

				$(window).scroll(function(){
					var sTop = $(window).scrollTop();
					var sThem=0;
					for(var i in a){
						if(sTop+100>a[i]){
							sThem=i;
							continue;
						}
					}
					$(".tish-title").removeClass("tish-title");
					$(".faq-title-item").eq(sThem).addClass("tish-title");
					
					$(".faq-title .pa").css({
						"top" : -($(".faq-title .pa").height()*(sTop/$(".body").height()) - 90) + "px"
					});

					console.log(sTop);
					console.log($(".body").height());

				});
				$(".faq-title-item").click(function(){
					var index=$(this).index();
					$('body,html').animate({scrollTop:a[index]-90},500);
				});


			};

			$(".next").click(function(){
				$(".pre").css({
					"opacity" : 1
				});
				$(".faq-title .pa").css({
					"top" : ($(".faq-title .pa").css("top").replace("px","") - 40) + "px"
				});
			});

			$(".pre").click(function(){
				$(".faq-title .pa").css({
					"top" : ($(".faq-title .pa").css("top").replace("px","") - 0 + 40) + "px"
				});
			});


 






			init();
        }); 
	};




	$.fn.tap = function(){
		return this.each(function(){
			var that = $(this),
				tapBnt = that.find("dd"),
				tapContent = that.find(".hr-c-wrp"),
				init = function(){
					tapContent.eq(0).show();
					tapBnt.eq(0).addClass("this-s");
				}
			tapBnt.on("click",function(){
				$(".this-s").removeClass("this-s");
				$(this).addClass("this-s");
				tapContent.hide();
				that.find(".hr-c-wrp[data-id="+$(this).attr("data-id")+"]").show();
			});

			init();
        }); 
	};

})(jQuery);