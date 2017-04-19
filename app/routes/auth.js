module.exports = function (app) {
    var api = app.app.api.auth;
    var connection = app.persistencia.connectionFactory();
    var authDAO = new app.persistencia.authDAO(connection);

    app.post('/consultaCpf', function (req, res) {
        var usuario = {
            cpf: req.body.cpf
        }
        if (usuario.cpf) {
            authDAO.verificaCpf(usuario, function (erro, result) {
                if (result.length != 0) {
                    res.sendStatus(200);
                }
                res.end();
            });
        }
    });
    app.post('/consultaLogin', function (req, res) {
        var usuario = {
            login: req.body.login
        }
        authDAO.verificaLogin(usuario, function (erro, result) {
            if (result.length != 0) {
                res.sendStatus(200);
            }
            res.end();
        });
    });

    app.post('/cadastroTreinador', function (req, res) {
        var usuario = {
            login: req.body.login,
            password: req.body.password,
            cpf: req.body.cpf,
            grupo: 2
        }
        authDAO.cadastrar(usuario, function (erro, result) {
            console.log('------------------------------------');
            console.log(result);
            console.log('------------------------------------');
            res.status(202);
        });
    });


    app.post('/autenticar', api.autentica);
    app.use('/*', api.verificaToken);
    app.get('/ok', function (req, res) {
        res.status(200).json(req.usuario);
    });
};