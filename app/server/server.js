var http        = require('http');
var routes      = require('./routes').routes;


function onRequest(req, res){

    routes.route(req, res);
};

var server = http.createServer(onRequest).listen(1337);