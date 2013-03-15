var http 		= require('http');
var url  		= require('url');
var fs 			= require('fs');
var path 		= require('path');
var headers 	= require('./router').headers;


function onRequest(req, res){

	var called_file = url.parse(req.url).pathname;
	called_file = (called_file === '/') ? '/index.html' : called_file;

	var file_ext = path.extname(called_file).substr(1);

	console.log(called_file);

	fs.readFile(headers[file_ext].basePath + called_file, function(err, data){

		res.writeHeader(200, {'Content-Type': headers[file_ext].type});
		res.write(data);
		res.end();
	});
};

var server = http.createServer(onRequest).listen(1337);