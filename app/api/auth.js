var jwt = require("jsonwebtoken");
module.exports = function (app) {

    var api = {};
    api.autentica = function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var authDAO = new app.persistencia.authDAO(connection);
        var usuario = {
            login: req.body.login,
            password: req.body.password
        }
        authDAO.autentica(usuario, function (erro, result) {
            if (result.length==0) {
                console.log('Login/senha inválidos');
                res.sendStatus(401);
            } else {
                var token = jwt.sign({ login: usuario.login }, app.get('secret'), {
                    expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas
                });
                console.log('Autenticado: token adicionado na resposta');
                res.set('x-access-token', token); // adicionando token no cabeçalho de resposta
                res.end(); // enviando a resposta
            }
        });
    }

    api.verificaToken = function (req, res, next) {
        var token = req.headers['x-access-token']; // busca o token no header da requisição

        if (token) {
            console.log('Token recebido, decodificando');
            jwt.verify(token, app.get('secret'), function (err, decoded) {
                if (err) {
                    console.log('Token rejeitado');
                    return res.sendStatus(401);
                } else {
                    console.log('Token aceito')
                    // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                    req.usuario = decoded;
                    next();
                }
            });
        } else {
            console.log('Nenhum token enviado');
            return res.sendStatus(401);
        }
    }

    return api;
}