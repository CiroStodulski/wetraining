module.exports = function(app) {
    var api = app.app.api.auth;
    console.log('------------------------------------');
    console.log("entraando no autenticar");
    console.log('------------------------------------');
    app.post('/autenticar', api.autentica);
    app.use('/*', api.verificaToken);
    app.get('/ok', function(req, res){
           res.status(200).json(req.usuario);
    });
};