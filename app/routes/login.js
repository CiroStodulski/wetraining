var path = require('path');
module.exports = function (app) {

    app.get('/usuarios', function (req, res) {
        var connection = app.persistencia.connectionFactory();
        var UsersDAO = new app.persistencia.usersDAO(connection);
        UsersDAO.lista(function (erro, result) {
            console.log('------------------------------------');
            console.log(result);
            console.log('------------------------------------');
            res.status(200).json(result);
        });
    });

}