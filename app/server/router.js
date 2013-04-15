var url  		= require('url');
var fs 			= require('fs');
var path 		= require('path');
var headers 	= require('./headers');

var routes 		= {};

var routeModel = function(){

	this.data 		= [];
	this.template 	= "/index.html";
	this.callback 	= function(){};

	return this;
};

var applyRoute = function(prop_obj){

	var r = new routeModel();

	for(item in prop_obj){

		r[item] = prop_obj[item];
	};

	return r;
};

// TODO - add support for passing a single object containing multple routes
var set = function(request_path, param_obj, callback){

	if (request_path.indexOf(',') !== -1){

		var paths_array = request_path.split(',');

		for(var i = 0; i < paths_array.length; i += 1){

			routes[paths_array[i].trim()] = applyRoute(param_obj);
		}

	} else {

		routes[request_path] = applyRoute(param_obj);
	}

	return callback();
};

var route = function(request, response, callback){

	var called_file = url.parse(request.url).pathname;
	// TODO - this 'default' for root should be removed in favor of specifically
	// adding it to router_pages.js
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


		return typeof callback === 'function' ? callback(data) : true;
	});
};


exports.route 	= route;
exports.set 	= set;