var http 	= require('http');
var url  	= require('url');
var fs 		= require('fs');
var path 	= require('path');
var router 	= require('./router');

function onRequest(req, res){

	var headers = {

		html: {type: 'text/html', basePath: '../../templates'},
		js: {type: 'text/javascript', basePath: '../../js'},
		css: {type: 'text/css', basePath: '../..'}
	};
	
	var uri = url.parse(req.url).pathname;

	var f = (uri === '/') ? '/index.html' : uri;

	var ext = path.extname(f).substr(1);

	res.writeHeader(200, {'Content-Type': headers[ext].type});

	fs.readFile(headers[ext].basePath + f, function(err, data){

		res.write(data);
		res.end();
	});
};

var server = http.createServer(onRequest).listen(1337);