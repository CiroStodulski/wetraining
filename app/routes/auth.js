module.exports = function (app) {
    var api = app.app.api.auth;
    app.post('/cadastroTreinador', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var authDAO = new app.persistencia.authDAO(connection);
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