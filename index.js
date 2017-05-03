var app = require('./config/custom-express')();

app.listen(8080,function(){
    console.log('------------------------------------');
    console.log("Servidor iniciado!");
    console.log('------------------------------------');
});
