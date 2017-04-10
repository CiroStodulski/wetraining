angular.module('wetraining', ['ngAnimate', 'ngRoute', 'ngResource'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {

       $httpProvider.interceptors.push('tokenInterceptor');


        $routeProvider.when('/home', {
            templateUrl: '/pages/home.html',
         //   controller: 'HomeController'
        });

        $routeProvider.when('/login', {
            templateUrl: '../pages/login.html',
            controller: 'LoginController'
        });

        
		$routeProvider.otherwise({ redirectTo: '/home' });
       
    });