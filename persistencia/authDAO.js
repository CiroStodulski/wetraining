function authDAO(connection) {
    this._connection = connection;
}
authDAO.prototype.autentica = function (usuario,callback) {
    console.log('------------------------------------');
    console.log(usuario);
    console.log('------------------------------------');
   this._connection.query("select * from users where login = '"+usuario.login+"' and password ='"+usuario.password+"'",callback);
}
module.exports = function () {
    return authDAO;
};