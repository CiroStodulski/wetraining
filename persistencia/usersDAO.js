function UsersDAO(connection) {
    this._connection = connection;
}

UsersDAO.prototype.salva = function (user, callback) {
    this._connection.query('INSERT INTO users SET ?', user, callback);
}

UsersDAO.prototype.lista = function (callback) {
    this._connection.query('select * from users', callback);
}

UsersDAO.prototype.buscaPorId = function (usuario, callback) {
    this._connection.query("select * from users where login = ?", [usuario.login], callback);
}

module.exports = function () {
    return UsersDAO;
};