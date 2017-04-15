angular.module('wetraining')
    .controller('HomeController', function ($scope, $http, $location) {
        $scope.usuerLogado = {};
        $scope.menssagemGrupo = '';
        $http.get('/ok')
            .then(function (result) {
                $scope.usuerLogado = {
                    id: result.data.id,
                    login: result.data.login,
                    grupo: result.data.grupo
                }

                switch ($scope.usuerLogado.grupo) {
                    case 2:
                        $scope.menssagemGrupo = 'Bem vindo Treinador: '+$scope.usuerLogado.login;
                        break;
                    case 3:
                        $scope.menssagemGrupo = 'Bem vindo Aluno: '+$scope.usuerLogado.login;
                        break;

                    default:
                       $scope.menssagemGrupo = 'Administrador: '+$scope.usuerLogado.login;
                        break;
                }

            });


        $scope.ususarios = [];
        $scope.menssagem = '';
        $scope.listarUsuarios = function () {
            $http.get('/usuarios')
                .then(function (result) {
                    $scope.ususarios = result.data;
                },
                function (erro) {
                    $scope.menssagem = 'Algo deu errado';
                });
        };
    });