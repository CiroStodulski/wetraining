angular.module('wetraining')
    .factory('tokenInterceptor', function ($q, $window, $location) {

        var interceptor = {};

        interceptor.response = function (response) {
            var token = response.headers('x-access-token');
            if (token) {
                $window.localStorage.token = token;
                console.log(response.json);
                console.log("token armazenado no localStorage");
                console.log('------------------------------------');
                console.log($window.localStorage.token);
            }
            return response;
        }

        interceptor.request = function (config) {
            config.headers = config.headers || {};
         
            if ($window.localStorage.token) {
                config.headers['x-access-token'] = $window.localStorage.token;
                console.log('------------------------------------');
                console.log(config);
                console.log('------------------------------------');
            }
         
            return config;
        }

        return interceptor;

    });