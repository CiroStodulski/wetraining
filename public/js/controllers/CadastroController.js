angular.module('wetraining')
    .controller('CadastroController', function ($scope, $http, $location, $window) {
        $scope.user = {};
        $scope.msgCpf = '';
        $scope.msgLogin = '';
          $scope.msgSenha = '';
        $scope.bcpf = false;
        $scope.blogin = false;
        $scope.bloqueiacadastro = false;

        function validadordoscampos(login, cpf) {
            if (cpf == false && login == false) {
                $scope.bloqueiacadastro = false;
            } else {
                $scope.bloqueiacadastro = true;
            }
        }
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
        };
        $scope.verificaCpf = function () {
            if ($scope.user.cpf !=undefined) {
                $http.post('/consultaCpf', $scope.user)
                    .then(
                    function (result) {
                        if (result.data == "OK") {
                            $scope.msgCpf = 'CPF já Cadastrado';
                            $scope.bcpf = true;
                            validadordoscampos($scope.blogin, $scope.bcpf);
                        } else {
                            $scope.msgCpf = '';
                            $scope.bcpf = false;
                            validadordoscampos($scope.blogin, $scope.bcpf);
                        }
                    })
            }
        };
        $scope.verificaLogin = function () {
            console.log($scope.user.login);
            if ($scope.user.login != undefined) {
                $http.post('/consultaLogin', $scope.user)
                    .then(
                    function (result) {
                        if (result.data == "OK") {
                            $scope.msgLogin = 'Login já Cadastrado';
                            $scope.blogin = true;
                            validadordoscampos($scope.blogin, $scope.bcpf);
                        } else {
                            $scope.msgLogin = '';
                            $scope.blogin = false;
                            validadordoscampos($scope.blogin, $scope.bcpf);
                        }
                    })
            }
        };

        $scope.verificaSenha = function () {
            if ($scope.user.password != $scope.user.passwordc) {
                $scope.bloqueiacadastro = true;
                  $scope.msgSenha = 'A senha não confere';
            } else {
                $scope.bloqueiacadastro = false;
                $scope.msgSenha = '';
            }
        };


    });