angular.module('wetraining')
    .controller('HomeController', function ($scope, $http, $location) {
        $http.get('/usuarios');
        $scope.ususarios = [];
        $scope.menssagem = '';
        $scope.listarUsuarios = function () {
            $http.get('/ok')
                .then(function (result) {
                    console.log(result);
                },
                function (erro) {
                    console.log(erro);
                    $scope.menssagem = 'Algo deu errado';
                });
        };
    });