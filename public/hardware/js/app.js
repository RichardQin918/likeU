var App = angular.module('App',['ngRoute','ngAnimate','ngSanitize']);


App.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/index', {
            templateUrl: 'index',
            controller: 'index'
        })
        .when('/all', {
            templateUrl: 'all',
            controller: 'all'
        })
        .otherwise({
            templateUrl: '404',
            controller: 'f04'
        });
}]);


App.baseUrl = "http://www.cume.cc/";


App.urlConfig = {

};