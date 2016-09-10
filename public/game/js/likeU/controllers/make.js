(function($){
			$.getUrlParam = function(name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r!=null) 
				return unescape(r[2]); return null;
			}
		})(jQuery);


$(document).ready(function() {
	var cue = $.getUrlParam('mode');
	var creater = $.getUrlParam('creater');
	var myInfo = localStorage.getItem("myInfo");
	myInfo = JSON.parse(myInfo);
	var openid = $.getUrlParam('openid');
	var takerHead = myInfo.headimgurl;
	var takerName = myInfo.nickname;
	var mode = $.getUrlParam('mode');
	var answerList = [];
	var makerAnswer = "";
	var takerAnswer = "";
	var qidList = [];
	var takerQList = [];
	var prefix = "";
	var otherTakerName = [];
	var otherTakerHead = [];
	var otherTakerGrade = [];
	//maker mode render
	if (cue == "maker"){
		var question = $("#question1").val();
		var page = 1;
		// alert("we are at page:" + page);
		$("#page").text(page);
		$("#footer").text("第" + page + "题,共5题");

		//maker click
		$("#choiceList").on("click","li",function () {
			
			$(".right").hide();
			$(this).find(".right").show();
			// alert($(this).find(".qtitle").text());
			makerAnswer = $(this).find(".qtitle").text();
		});



		question = JSON.parse(question);
		
		// alert(questions[0]);

		$("#qid").text(question.id); 

		$("#title").text(page + '.' + question.title);
			
			$("#A").text("A." + question.optionA.name);
			$("#Aimg").attr("src", "../../game/images/likeU/questions/"+question.optionA.img);
			
			$("#B").text("B." + question.optionB.name);
			$("#Bimg").attr("src", "../../game/images/likeU/questions/"+question.optionB.img);
			
			$("#C").text("C." + question.optionC.name);
			$("#Cimg").attr("src", "../../game/images/likeU/questions/"+question.optionC.img);
			
			$("#D").text("D." + question.optionD.name);
			$("#Dimg").attr("src", "../../game/images/likeU/questions/"+question.optionD.img);



		//save maker answer and send to backend 
		$("#go_to").on("click", function(){
				
				answerList .push(makerAnswer);
				
				
				qidList .push($("#qid").text());
				question = $("#question"+(page+1)).val();
				$(".right").hide();

				if (page==5){
					
					$("#go_to").attr('href',prefix + "/gamePage/likeU/start?mode=finishMake&creater=" + openid);
					var data = {
	                	"questionID": qidList,
	                 	"openID": openid,
	                 	"content":answerList,
	                 	"mode": "maker"
			        };
				    
				   

			  		// var data = {
			  		// 	"QuestionID": "",
			  		// 	"OpenID": "",
			  		// 	"Content":""
			  		// };
					// alert("this is the sending data:"+ JSON.stringify(data) + typeof(data));

						$.ajax({
							type: "POST",
			                contentType: "application/json; charset=utf-8",
			                // dataType:'json',
			                url: prefix + "/game/likeU/inputData",//传入后台的地址/方法
			                async: true,
			                data: JSON.stringify(data),//参数，这里是一个json语句
			                success: function (msg) {
			                    alert("data saved!");
			                },
			                error: function (err) {
			                    alert("err:" + JSON.stringify(err));
			                }
						});
					return 	
				}
				page++;


				$("#footer").text("第" + page + "题,共5题");
				// var question = $("$question2").val();
				question = JSON.parse(question);
				
				
				// alert(questions[0]);

				$("#qid").text(question.id); 

				//render

				$("#title").text(page + '.' + question.title);
					
					$("#A").text("A." + question.optionA.name);
					$("#Aimg").attr("src", "../../game/images/likeU/questions/"+question.optionA.img);
					
					$("#B").text("B." + question.optionB.name);
					$("#Bimg").attr("src", "../../game/images/likeU/questions/"+question.optionB.img);
					
					$("#C").text("C." + question.optionC.name);
					$("#Cimg").attr("src", "../../game/images/likeU/questions/"+question.optionC.img);
					
					$("#D").text("D." + question.optionD.name);
					$("#Dimg").attr("src", "../../game/images/likeU/questions/"+question.optionD.img);	
		
		});
		//shuffle 
		var count = 1;
		$("#random").on("click",function(){
			if(page ==1){
				if (count ==1){
					question = $("#qbak1").val();
					count = 2;
					$(".right").hide();
				}

				else if (count ==2){
					question = $("#qbak2").val();
					count = 3;
					$(".right").hide();
				}

				else if (count ==3){
					question = $("#question1").val();
					count = 1;
					$(".right").hide();
				}
			}

			else if(page ==2){
				if (count ==1){
					question = $("#qbak3").val();
					count = 2;
					$(".right").hide();
				}

				else if (count ==2){
					question = $("#qbak4").val();
					count = 3;
					$(".right").hide();
				}

				else if (count ==3){
					question = $("#question2").val();
					count = 1;
					$(".right").hide();
				}
			}

			else if(page ==3){
				if (count ==1){
					question = $("#qbak5").val();
					count = 2;
					$(".right").hide();
				}

				else if (count ==2){
					question = $("#qbak6").val();
					count = 3;
					$(".right").hide();
				}

				else if (count ==3){
					question = $("#question3").val();
					count = 1;
					$(".right").hide();
				}
			}

			else if(page ==4){
				if (count ==1){
					question = $("#qbak7").val();
					count = 2;
					$(".right").hide();
				}

				else if (count ==2){
					question = $("#qbak8").val();
					count = 3;
					$(".right").hide();
				}

				else if (count ==3){
					question = $("#question4").val();
					count = 1;
					$(".right").hide();
				}
			}

			else if(page ==5){
				if (count ==1){
					question = $("#qbak9").val();
					count = 2;
					$(".right").hide();
				}

				else if (count ==2){
					question = $("#qbak10").val();
					count = 3;
					$(".right").hide();
				}

				else if (count ==3){
					question = $("#question5").val();
					count = 1;
					$(".right").hide();
				}
			}

			else {
				alert("shuffle error!");
			}

			question = JSON.parse(question);

				$("#qid").text(question.id); 
				$("#title").text(page + '.' + question.title);
					
					$("#A").text("A." + question.optionA.name);
					$("#Aimg").attr("src", "../../game/images/likeU/questions/"+question.optionA.img);
					
					$("#B").text("B." + question.optionB.name);
					$("#Bimg").attr("src", "../../game/images/likeU/questions/"+question.optionB.img);
					
					$("#C").text("C." + question.optionC.name);
					$("#Cimg").attr("src", "../../game/images/likeU/questions/"+question.optionC.img);
					
					$("#D").text("D." + question.optionD.name);
					$("#Dimg").attr("src", "../../game/images/likeU/questions/"+question.optionD.img);

		});



	}
		//taker mode
	else if (cue == "taker"){
		alert("the creater is :"+ creater);
		$("#random").css("display","none");
		$("#retry_maker").css("display","block");
		$("#retryMakerPage").attr("href", prefix + "/gamePage/likeU/make?mode=taker&openid=" + openid + "&creater=" + creater);
		$.ajax({
				type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType:'json',
                url: prefix + "/gamePage/likeU/getQuestion",//send to backend location/function 
                async: true,
                data: {"creater": creater},//parameter，syntax json
                success: function (data) {
                    alert("this is data:" + JSON.stringify(data) + typeof(data));
                    // alert(data);
              		var q1 = data[0];
              		var q2 = data[1];
              		var q3 = data[2];
              		var q4 = data[3];
              		var q5 = data[4];
              		var results = data[5];
              		// alert("this is q1:" + q1);

              		$("#question1").val(q1);
              		$("#question2").val(q2);
              		$("#question3").val(q3);
              		$("#question4").val(q4);
              		$("#question5").val(q5);

              		// alert("send succeed!"+ $("#question1").val()); 
    				
    				var page = 1;
					// alert("we are at page:" + page);
					$("#page").text(page);
					$("#footer").text("第" + page + "题,共5题");
					var question = $("#question" + page).val();

					//maker/taker 选择答案
					$("#choiceList").on("click","li",function () {
						$(".right").hide();
						$(this).find(".right").show();
						// alert($(this).find(".qtitle").text());
						takerAnswer = $(this).find(".qtitle").text();
					});


					question = JSON.parse(question);
					
					// alert(questions[0]);

					$("#qid").text(question.id); 

					$("#title").text(page + '.' + question.title);
						
					$("#A").text("A." + question.optionA.name);
					$("#Aimg").attr("src", "../../game/images/likeU/questions/"+question.optionA.img);
					
					$("#B").text("B." + question.optionB.name);
					$("#Bimg").attr("src", "../../game/images/likeU/questions/"+question.optionB.img);
					
					$("#C").text("C." + question.optionC.name);
					$("#Cimg").attr("src", "../../game/images/likeU/questions/"+question.optionC.img);
					
					$("#D").text("D." + question.optionD.name);
					$("#Dimg").attr("src", "../../game/images/likeU/questions/"+question.optionD.img);

					// alert("done !");


					//choose answer
					$("#go_to").on("click", function(){
							
							
							answerList .push(takerAnswer);
							
							qidList .push($("#qid").text());
							question = $("#question"+(page+1)).val();
							$(".right").hide();

							if (page==5){
								var SendingData = {
						    		"answerID": creater,
						    		"questionID": qidList,
						    		"openID":openid,
						    		"content": answerList,
						    		"mode": "taker",
						    		"takerhead": takerHead,
						    		"takername": takerName
						    	};


							$.ajax({
								type: "POST",
				                contentType: "application/json; charset=utf-8",
				                // dataType:'json',
				                url: prefix + "/game/likeU/inputData",//send to backend location/function 
				                async: false,
				                data: JSON.stringify(SendingData),//parameter, syntax json
				                success: function (data) {
				                    alert("data is here :" + data + typeof(data));
				                    data = JSON.parse(data);
				                    alert("this is the grade before sending to url:" + data.grade);
				                    content = data.content;
				                    
				                    var temTakerList = [];
				                    if (content !== null ){
										// data.content = JSON.parse(content);
										for (i=0;i<content.length; i++){
										// content = JSON.parse(content[0]);
											
										// alert("this is comment1!!:" + comment1 + typeof(comment1));
											var otherTaker = content[i].Content;
											alert("this is otherTaker:" + otherTaker + typeof(otherTaker));
											for (j=0; j<otherTaker.length; j++){
												var p = otherTaker[j];
												var info = '';
												if (p == "+"){
													while (otherTaker[j+1] != "+" && j < otherTaker.length -1 && otherTaker[j+1] != '"'){
														info = info + otherTaker[j+1];
														j++;
													}
													temTakerList .push(info);
												}
											}	
										}
										alert("this is temTakerList:" + temTakerList);
										for (k=1;5*k<temTakerList.length; k++){
											otherTakerGrade .push(temTakerList[5*k]);
											otherTakerName .push(temTakerList[5*k + 1]);
											otherTakerHead .push(temTakerList[5*k + 2]);
											
										}
										alert("this is otherTakerList:" + otherTakerGrade + otherTakerName + otherTakerHead );
									}

									var otherInfo = {
										otherGrade : otherTakerGrade,
										otherName : otherTakerName,
										otherHead : otherTakerHead
									}

									localStorage.setItem("otherInfo", JSON.stringify(otherInfo));
				                    
				                    // $("#go_to").attr('href','');
				                    $("#go_to").attr('href',prefix + "/gamePage/likeU/end?grade=" + data.grade);
				                    
				                },
				                error: function (err) {
				                    alert("err:" + JSON.stringify(err));
				                }

							});
							
							return;
							}
							page++;


							$("#footer").text("第" + page + "题,共5题");
							// var question = $("$question2").val();
							question = JSON.parse(question);
							
							
							// alert(questions[0]);

							$("#qid").text(question.id); 

							//render

							$("#title").text(page + '.' + question.title);
								
								$("#A").text("A." + question.optionA.name);
								$("#Aimg").attr("src", "../../game/images/likeU/questions/"+question.optionA.img);
								
								$("#B").text("B." + question.optionB.name);
								$("#Bimg").attr("src", "../../game/images/likeU/questions/"+question.optionB.img);
								
								$("#C").text("C." + question.optionC.name);
								$("#Cimg").attr("src", "../../game/images/likeU/questions/"+question.optionC.img);
								
								$("#D").text("D." + question.optionD.name);
								$("#Dimg").attr("src", "../../game/images/likeU/questions/"+question.optionD.img);	
					
					});




                },
                error: function (err) {
                    alert("err encountered!!:" + JSON.stringify(err));
				}
			});
          
	}

	else {
		alert(" mode err!");
	}


		


		



	


		
});
