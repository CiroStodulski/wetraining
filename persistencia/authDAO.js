function authDAO(connection) {
    this._connection = connection;
}
authDAO.prototype.autentica = function (usuario,callback) {
   this._connection.query("select * from users where login = '"+usuario.login+"' and password ='"+usuario.password+"'",callback);
}
authDAO.prototype.cadastrar = function(usuario,callback){
    this._connection.query('insert into users set ?',usuario,callback);    
}
module.exports = function () {
    return authDAO;
};