//底部菜单
App.directive('bottom', function(){
  // Runs during compile
  return {
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<div>'+
              '<div class="height-50"></div>'+
                '<div class="bottom">' +
                  '<div class="zz"  ng-show="pageView.showMore" ng-click="pageView._showMore(2)"></div>'+
                  '<ul>'+
                    '<li><a href="#index" class="{{pageViewC.tapNum == 1 ?\'this-tab\':\'\'}}">分类</a></li>'+
                    '<li><a href="#all" class="{{pageViewC.tapNum == 2 ?\'this-tab\':\'\'}}">全部</a></li>'+
                    '<li><a href=""><img src="../../hardware/images/add.png" alt=""></a></li>'+
                    '<li><a href="" class="this-hot {{pageViewC.tapNum == 4 ?\'this-tab\':\'\'}}">分享</a></li>'+
                    '<li><a href="" class="{{pageViewC.tapNum == 5 ?\'this-tab\':\'\'}}" ng-click="pageView._showMore(1)">更多</a>'+
                  '<dl class="more" ng-show="pageView.showMore">'+
                    '<dd>菜单</dd>'+
                    '<dd>菜单</dd>'+
                    '<dd>菜单</dd>'+
                  '</dl>'+
                    '</li>'+
                  '</ul>'+
                '</div>'+
                '</div>',
    link: function($scope, iElm, iAttrs, controller) {
      //控制页面显示的属性和方法
      $scope.pageView = {
        showMore : false, //显示更多菜单
        _showMore : function(k){ //切换显示更多
          if(k == "1"){
            $scope.pageView.showMore = true;
          }else{
            $scope.pageView.showMore = false;
          }
        }
      };
    }
  };
});










