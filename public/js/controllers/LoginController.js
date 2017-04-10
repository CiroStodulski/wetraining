angular.module('wetraining')
    .controller('LoginController', function ($scope, $http, $location) {
        $scope.user = {};
        $scope.menssagem = '';
        $scope.autenticar = function () {
            var user = {
                login: $scope.user.login,
                password: $scope.user.password
            }
            $http.post('/autentica', user)
                .then(function () {
                    $location.path('/');
                },
                function (erro) {
                    $scope.menssagem = 'Login ou senha invalidos';
                    $scope.user = {};
                });
        };
    });