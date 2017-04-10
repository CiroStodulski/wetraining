var jwt = require("jsonwebtoken");
module.exports = function (app) {
    app.post('/autentica', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var authDAO = new app.persistencia.authDAO(connection);
        var usuario = {
            login: req.body.login,
            password: req.body.password
        }
        authDAO.autentica(usuario, function (erro, result) {
            if (result.length == 0) {
                console.log('Login/senha inválidos');
                res.sendStatus(401);
            } else {
                var token = jwt.sign({ login: result.login }, app.get('secret'), {
                    expiresIn: 1800 // expires in 30 min
                });
                console.log('Autenticado: token adicionado na resposta');
                res.set('x-access-token', token);
                res.end();
            }
        });

    });
    app.use('/*', function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            console.log("verificando token");
            jwt.verify(token, app.get('secret'), function (erro, decoded) {
                if (erro) {  
                    console.log("token rejeitado");
                    res.sendStatus(401);
                }
                req.login = decoded;
                next();
            });
        } else {
            console.log("token não enviado");
            res.sendStatus(401);
        }
    });

}