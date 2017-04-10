var app = require('./config/custom-express')();

app.listen(3000,function(){
    console.log('------------------------------------');
    console.log("Servidor iniciado!");
    console.log('------------------------------------');
});