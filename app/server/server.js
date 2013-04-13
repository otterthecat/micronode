var http 		= require('http');
var router 		= require('./router');


router.set('/my/path.html', {template: '/my/index.html'}, function(){

	console.log('setting my path');
});

router.set('/index.html', {}, function(){

	console.log("setting index");
});

router.set('/testing-route.html', {template: '/testing.html'}, function(){

	console.log('setting testing route');
});

router.set('/404.html', {template: '/404.html'}, function(){

	console.log("404 - Requested Page Not Found");
});


function onRequest(req, res){


	router.route(req, res, function(resp){

		console.log('request has been routed');
	});
};

var server = http.createServer(onRequest).listen(1337);