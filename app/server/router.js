var url  		= require('url');
var fs 			= require('fs');
var path 		= require('path');


var headers = {

	html: {type: 'text/html', basePath: '../../templates'},
	js: {type: 'text/javascript', basePath: '../..'},
	css: {type: 'text/css', basePath: '../..'},
	ico: {type: '', basePath: '../../img'},
	png: {type: 'image/png', basePath: '../..'},
	jpg: {type: 'image/jpeg', basePath: '../..'}
};

var routes = function(){

	this.data  = [];
	this.template = "/index.html";
	this.callback = function(){};

	return this;
};

var applyRoute = function(prop_obj){

	var r = new routes();

	for(item in prop_obj){

		r[item] = prop_obj.item;
	};

	return r;
};

var set = function(request_path, param_obj, callback){

	routes[request_path] = applyRoute(param_obj);

	return callback();
};

var route = function(request, response, callback){

	var called_file = url.parse(request.url).pathname;
	called_file = (called_file === '/') ? '/index.html' : called_file;

	var file_ext = path.extname(called_file).substr(1);

	if( !headers.hasOwnProperty(file_ext) || !routes.hasOwnProperty(called_file) && file_ext === "html"){
		file_ext = "html";
		called_file = "/404.html";
	};

	var requested_file = routes[called_file] != undefined ? routes[called_file].template : called_file;

	fs.readFile(headers[file_ext].basePath + requested_file, function(err, data){

		response.writeHeader(200, {'Content-Type': headers[file_ext].type});
		response.write(data);
		response.end();

		callback(data);
	});
};


exports.route 	= route;
exports.set 	= set;