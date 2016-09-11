App.controller('all', ['$scope','$rootScope','$http','$location','$interval','$timeout','weixin', function($scope,$rootScope,$http,$location,$interval,$timeout,weixin){
	$rootScope.loading = true;
	$scope.openId = OPENID;

	$scope.order = "orderBy";
	//控制页面显示的属性和方法
	$scope.pageViewC = {
		treeTimeOut : "",//书节点超时
		nowLC : "",//监控树节点
		page : "all", //页面名称
		tapNum : 2, //当前tap的页数
		treeTimer : "", //获取目录时间控制
		fDatas : [], //页面调用节点
		_fDatas : "", //页面调用节点
		_getTree : function(){
			$rootScope.loading = true;
			$scope.pageViewC.fDatas = [];

			$scope.pageViewC.treeTimeOut = $timeout(function(){
				//alert("超时了");
				$timeout.cancel($scope.pageViewC.treeTimeOut);//取消超时
				//$location.path('/index');
				$rootScope.loading = false;
			},10000);
			
			$scope.pageViewC.treeTimer = $interval(function(){
				//判断localstory是否相同
				if($scope.pageViewC.nowLC != localStorage.getItem("tree")){
					$timeout.cancel($scope.pageViewC.treeTimeOut);//取消超时
					$scope.pageViewC._cancleGerTree();
					$scope.pageViewC.___getTree(localStorage.getItem("tree"));
					$rootScope.loading = false;
				}
			},100);
		},//获取目录
		_cancleGerTree : function(){
			$interval.cancel($scope.pageViewC.treeTimer);

		}, //取消获取目录
		___getTree : function(obj){
			if(!obj) return false;
			obj = JSON.parse(obj).listPath;
			for(var i = 0 ; i < obj.length ; i++){
				var nameObj = obj[i].filePath.split("/");
				var fData = {
					orderBy : 2,
					mate :{
						name : "",
						image : ""
					},
					id : i,
					name : obj[i].name, 
					attribute : obj[i].isFile?"file":"folder",
					filePath : obj[i].filePath,
					imgPath : "http://www.cume.cc/image/" + obj[i].filePath,
					icon : obj[i].isFile?"http://www.cume.cc/image/" + nameObj[0] + "/small/" + nameObj[1] : "../../hardware/images/file.png",
					authority : {
						canDown : true,
						canShare : true,
						canDelete : false,
						canDo : true
					}
				};
				$scope.pageViewC.fDatas.push(fData);
			}
			//当是一级菜单时可以获取用户名字和头像
			if($scope.pageViewC.routeArray.length == 1 && $scope.pageViewC.fDatas.length>0){
				//匹配
				$scope.pageViewC._matchInfo($scope.pageViewC.fDatas);
			}else{
				$scope.pageViewC._fDatas = $scope.pageViewC.fDatas;
			}
		}, //整理目录
		_nextTree : function(pathName,isFile,imgUrl1,imgUrl2){
			$scope.pageViewC.nowLC = localStorage.getItem("tree");
			$scope.fAction.openNum = -1;//关闭更多

			if(isFile == "file"){

				$scope.pageViewC._showBigImg(imgUrl1,imgUrl2);
				return;
			}
			$scope.pageViewC.fDatas = [];
			var cmds = {
				openId: OPENID,
		    	pathName: pathName,
				cmdName: "getListFilePath"
			}
			fun.informService(fun.getMessage(cmds));
			$scope.pageViewC._getTree();
			//记录路由
			$scope.pageViewC.routeArray.push(pathName);
			if($scope.pageViewC.routeArray.length != 1){
				$scope.pageViewC.showBack = true;
			}
		},
		_preTree : function(){
			$scope.pageViewC.nowLC = localStorage.getItem("tree");
			$scope.fAction.openNum = -1;//关闭更多
			$scope.pageViewC.routeArray.pop();
			//重新回去树数据
			$scope.pageViewC.fDatas = [];
			var cmds = {
				openId: OPENID,
		    	pathName: $scope.pageViewC.routeArray[$scope.pageViewC.routeArray.length-1],
				cmdName: "getListFilePath"
			}
			fun.informService(fun.getMessage(cmds));
			$scope.pageViewC._getTree();

			if($scope.pageViewC.routeArray.length == 1){
				$scope.pageViewC.showBack = false;
			}
		},
		routeArray : [""],//路由，历史
		showBack : false,//显示返回按钮
		_showBigImg : function(img1,img2){
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: config.sign.appId, // 必填，公众号的唯一标识
			    timestamp: config.sign.timestamp, // 必填，生成签名的时间戳
			    nonceStr: config.sign.nonceStr, // 必填，生成签名的随机串
			    signature: config.sign.signature,// 必填，签名，见附录1
			    jsApiList: ["previewImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function(){
				wx.previewImage({
				    current: img1, // 当前显示图片的http链接
				    urls: [img2] // 需要预览的图片http链接列表
				});
			});
		},//查看大图
		_matchInfo : function(fDatas){
			var openIds = [];
			for(var i = 0;i < fDatas.length;i++){
				openIds.push(fDatas[i].name);
			}
			var openId ="";
			//请求获取头像和名字
			$http.get("http://www.cume.cc/weixin/getWeixinUsersBatch?openIds="+JSON.stringify(openIds)+"&v=" + new Date().getTime()).success( function(response) {
			   if(response.data && response.status == 0){
			   	for(var r = 0;r<response.data.length;r++){
					openId = response.data[r].OPEN_ID;
					for(var j = 0;j<fDatas.length;j++){
						if(fDatas[j].name == openId){
							fDatas[j].mate.name = response.data[r].USER_NAME;
							fDatas[j].mate.image = response.data[r].AVATAR;
						}
					}
				}
				for(var c = 0;c<fDatas.length;c++){
					if(fDatas[c].name == localStorage.getItem("_openId")){
						fDatas[c].orderBy = 1;
					}
				}
				$scope.pageViewC._fDatas = $scope.pageViewC.fDatas;
			   }
			}).error(function(response){
				alert(JSON.stringify(response));
			});
		},//匹配信息

	}

	//文件操作
	$scope.fAction = {
		openNum : -1,
		openAction : function(k){
			$scope.fAction.openNum = k;
		},
		actionFn : {
			doMoreShow : false,
			_doMoreShow : function(k){
				if(k==1){
					$scope.fAction.actionFn.doMoreShow = true;
				}else{
					$scope.fAction.actionFn.doMoreShow = false;
				} 
			}
		}
	};

	

	$scope.init = function(){
		fun.websocket(function(m){
			$scope.wsAction(m);
		});
		fun.informService(fun.getMessage(config.cmds[0]));

		fun.getSign();
		$scope.pageViewC.nowLC = localStorage.getItem("tree");
		//获取目录结构
		$scope.pageViewC._getTree();
	};




	$scope.wsAction = function(obj){
		switch(obj.cmdName){
			case "getListFilePath":
				localStorage.setItem("tree",JSON.stringify(obj));
				localStorage.setItem("canTree",1);
				break;
			default :

				break;
		}
	};








	$scope.init();
	
}]);