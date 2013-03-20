var headers = {

	html: {type: 'text/html', basePath: '../../templates'},
	js: {type: 'text/javascript', basePath: '../../js'},
	css: {type: 'text/css', basePath: '../..'},
	ico: {type: '', basePath: '../../img'}
};

var routes = {};

var set = function(request_path, cb, func, request_data){

	routes[request_path] = {
		data: request_data || null,
		callback: func || null
	};

	return cb();
};

var get = function(path_str, callback){

	if(!path_str || typeof path_str !== 'string'){

		return callback(routes);
	} else if(routes.hasOwnProperty(path_str)) {

		return callback(routes[path_str]);
	}
};

exports.headers = headers;
exports.get 	= get;
exports.set 	= set;