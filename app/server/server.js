var http 		= require('http');
var url  		= require('url');
var fs 			= require('fs');
var path 		= require('path');
var router 		= require('./router');

var headers = router.headers


router.set('/my/path.html', function(){

	console.log('setting my path');
});

router.set('/testing-route.html', function(){

	console.log('setting testing route');
}, "fake string", function(){});


var r = router.get('/testing-route', function(data){

	console.log('getting router : ');
	console.log(data);
	return data;
});

function onRequest(req, res){

	var called_file = url.parse(req.url).pathname;
	var file_ext = path.extname(called_file).substr(1);
	console.log(called_file);
	console.log('file ext = ' + file_ext);

	called_file = (called_file === '/') ? '/index.html' : called_file;

	if(file_ext === 'html'){

		router.get(called_file, function(data){

			console.log('router is calling stuff');
			console.log(data);
		});

	} else {

		fs.readFile(headers[file_ext].basePath + called_file, function(err, data){

			res.writeHeader(200, {'Content-Type': headers[file_ext].type});
			res.write(data);
			res.end();
		});
	}
};

var server = http.createServer(onRequest).listen(1337);