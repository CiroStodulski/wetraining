var express = require('express');
var consign = require('consign');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");
const favicon = require('express-favicon');

module.exports = function () {

    var app = express();
    app.set('secret', 'wetrainingajudaotreinadorisico');
    app.use(favicon(__dirname + 'favicon.png'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('./public'));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header('Access-Control-Allow-Credentials', "*");
        res.header('Access-Control-Expose-Headers', 'x-access-token'); //essta linha habilita o token no header
        next();
    });

    consign()
        .then('persistencia')
        .then('app/api')
        .then('app/routes/auth.js')
        .then('app/routes')
        .into(app);


    return app;

}