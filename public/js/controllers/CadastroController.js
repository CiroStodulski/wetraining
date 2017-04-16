angular.module('wetraining')
    .controller('CadastroController', function ($scope, $http, $location, $window) {
        $scope.user = {};
        $scope.menssagem = '';
        $scope.cadastrar = function () {
            $http.post('/cadastroTreinador', $scope.user)
                .then(function () {
                $scope.menssagem = 'Treinador Cadastrado';
                 $location.path('/');
                },
                function (erro) {
                    $scope.menssagem = 'Erro';
                    $scope.user = {};
                });
        }
    });