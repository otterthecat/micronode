var http 		= require('http');
// TODO - don't like name 'route_pages'
var router 		= require('./router_pages').router;


function onRequest(req, res){


	router.route(req, res);
};

var server = http.createServer(onRequest).listen(1337);