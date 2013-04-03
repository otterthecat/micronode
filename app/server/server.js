var http 		= require('http');
var router 		= require('./router');


router.set('/my/path.html', {}, function(){

	console.log('setting my path');
});

router.set('/', {}, function(){

	console.log("setting index");
});

router.set('/testing-route.html', {}, function(){

	console.log('setting testing route');
});


function onRequest(req, res){


	router.route(req, res, function(resp){

		console.log('request has been routed');
	});
};

var server = http.createServer(onRequest).listen(1337);