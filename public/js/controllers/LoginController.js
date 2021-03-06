angular.module('wetraining')
    .controller('LoginController', function ($scope, $http, $location, $window) {
        $scope.user = {};
        $scope.menssagem = '';
        $scope.userLogado = {};
        $scope.autenticar = function () {
            var user = {
                login: $scope.user.login,
                password: $scope.user.password
            }
            $http.post('/autenticar', user)
                .then(function () {
                    $scope.userLogado = $window.sessionStorage;
                    $location.path('/');
                },
                function (erro) {
                    $scope.menssagem = 'Login ou senha invalidos';
                    $scope.user = {};
                });
        };
    
        $scope.deslogar = function () {
            delete $window.sessionStorage.token;
            $location.path('/login');
        }
    });