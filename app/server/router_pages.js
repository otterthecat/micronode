var router 		= require('./router');


router.set('/my/path.html, /super/stuff.html', {template: '/my/index.html'}, function(){

	console.log('setting my path');
});

router.set('/index.html', {}, function(){

	console.log("setting index");
});

router.set('/testing-route.html', {template: '/testing.html'}, function(){

	console.log('setting testing route');
});

router.set('/404.html', {template: '/404.html'}, function(){

	console.log("setting 404 page");
});

// TODO - really don't like the name of this file
// or the export. Want something more appropriate, but
// drawing a blank at the moment
exports.router = router;