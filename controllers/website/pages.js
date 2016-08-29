/*
 Created with Sublime Text 2.
 User: yanglong
 Date: 01/14/16
 Time: 13:44 AM
 Desc: 新闻列表逻辑控制器
 */
 var fs = require("fs");
//返回 "12-10" 的时间字符串格式
 var formatDateTime = function(dateStr){
	 dateStr = dateStr?dateStr.replace(/-/g,"/"):"12-10";
	var _date = new Date(dateStr);
	var month = _date.getMonth() + 1;
	month = month<10? "0" + month : mouth + "";
	var day = _date.getDate();
	day = day<10? "0" + day : day + "";
	return month + "-" + day;
 };

//返回 "2015-2-2" 的时间字符串格式
 var formatDate = function(dateStr){
	dateStr = dateStr?dateStr.replace(/-/g,"/"):"2015-2-2";
	var _date = new Date(dateStr);
	var year = _date.getFullYear();
	var month = _date.getMonth() + 1;
	month = month<10? "0" + month : mouth + "";
	var day = _date.getDate();
	day = day<10? "0" + day : day + "";
	return year + "-" + month + "-" + day;
 };


//首页
exports.indexPage = function(req, res, next) {
	var newsList = [];
	fs.readFile("./config/website/news.json","utf8",function (error,data){
		if(error) throw error;

		JSON.parse(data).newses.forEach(function (n, k){

			n.creatTime = formatDate(n.creatTime);
			newsList .push(n);
		});

		res.render('website/index.html', { 
			model: 'index',
			title:'炒米科技',
			newsList : newsList,
			pageKeyWord : '智能化,人像识别,物体识别,美食识别,照片梳子,照片整理,基于人像地理位置社交,美图分享',
			pageDescription : '照片梳子是一款具备人像识别的智能化手机照片和图片的高效管理工具，有了照片梳子，你可以轻松管理你的自拍、好友、景物照片，通过人像识别技术快速聚合人像的照片，手机自带的图片全部整理归档，打造自己的图片世界。我们还提供强大的相片人像分组管理，加密，收藏，分享等照片管理功能.'
		});
	});
};

//新闻列表页
exports.newsPage = function(req, res, next) {
	var newsList=[];
	fs.readFile("./config/website/news.json","utf8",function (error,data){
		if(error) throw error;

		JSON.parse(data).newses.forEach(function (n, k){
			n.creatTime = formatDate(n.creatTime);
			newsList .push(n);
		});

		res.render('website/news.html', { 
			model: 'news',
			title:'新闻动态',
			newsList : newsList,
			pageKeyWord : '智能化,人像识别,物体识别,美食识别,照片梳子,照片整理,基于人像地理位置社交,美图分享',
			pageDescription : '照片梳子是一款具备人像识别的智能化手机照片和图片的高效管理工具，有了照片梳子，你可以轻松管理你的自拍、好友、景物照片，通过人像识别技术快速聚合人像的照片，手机自带的图片全部整理归档，打造自己的图片世界。我们还提供强大的相片人像分组管理，加密，收藏，分享等照片管理功能.'
		});
	});
};


//新闻详情
exports.newsDetailPage = function(req, res, next) {

	var news;
	var id = req.query._id


	console.log(id);

	fs.readFile("./config/website/news.json","utf8",function (error,data){
		if(error) throw error;
		JSON.parse(data).newses.forEach(function (n, k){
			if(n.id == id){
				n.creatTime = formatDate(n.creatTime);
				news = n;
			}
		});

		console.log(news);
		if(!news){
			res.redirect("/404.html");
		}else{
			res.render('website/news-detail.html', { 
				model: 'newsDetail',
				title: news.title,
				news : news,
				pageKeyWord : news.keyword,
				pageDescription : news.description
			});
		}
	});
};


//关于我们
exports.aboutPage = function(req, res, next) {

	var recruits;
	fs.readFile("./config/website/recruit.json","utf8",function (error,data){
		if(error) throw error;
		recruits = JSON.parse(data);

		res.render('website/about.html', { 
			recruits : recruits,
			model: 'about',
			title:'关于我们',
			pageKeyWord : '智能化,人像识别,物体识别,美食识别,照片梳子,照片整理,基于人像地理位置社交,美图分享',
			pageDescription : '照片梳子是一款具备人像识别的智能化手机照片和图片的高效管理工具，有了照片梳子，你可以轻松管理你的自拍、好友、景物照片，通过人像识别技术快速聚合人像的照片，手机自带的图片全部整理归档，打造自己的图片世界。我们还提供强大的相片人像分组管理，加密，收藏，分享等照片管理功能.'
		});
	});
};

//联系我们
exports.contactPage = function(req, res, next) {

	res.render('website/contact.html', { 
		model: 'about',
		title:'联系我们',
		pageKeyWord : '智能化,人像识别,物体识别,美食识别,照片梳子,照片整理,基于人像地理位置社交,美图分享',
		pageDescription : '照片梳子是一款具备人像识别的智能化手机照片和图片的高效管理工具，有了照片梳子，你可以轻松管理你的自拍、好友、景物照片，通过人像识别技术快速聚合人像的照片，手机自带的图片全部整理归档，打造自己的图片世界。我们还提供强大的相片人像分组管理，加密，收藏，分享等照片管理功能.'
	});
};


//404
exports.fzfPage = function(req, res, next) {

	res.render('website/404.html', { 
		model: '404',
		title:'页面丢失',
		pageKeyWord : '智能化,人像识别,物体识别,美食识别,照片梳子,照片整理,基于人像地理位置社交,美图分享',
		pageDescription : '照片梳子是一款具备人像识别的智能化手机照片和图片的高效管理工具，有了照片梳子，你可以轻松管理你的自拍、好友、景物照片，通过人像识别技术快速聚合人像的照片，手机自带的图片全部整理归档，打造自己的图片世界。我们还提供强大的相片人像分组管理，加密，收藏，分享等照片管理功能.'
	});
};

