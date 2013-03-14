var path = require('path');

var getType = function(file_path_str, callback){

	var ext = path.extname(file_path_str);

	return typeof callback !== 'function' ? ext : callback(ext);
};

var route = function(uri, callback){


	pageData = {};

	switch(uri){

		case '/':

			pageData = {'title': 'Templated Title', 'content': 'Templated Content'};
			break;

		case '/thing1':

			pageData = {'title': 'Templated Thing','content': 'Thing\'s content'};
			break;

		case '/other':

			pageData = {'title': 'Another Templated Title', 'content': 'Templated something or other'};
			break;

		default: 

			uri = '404';
			break;

	}

	return callback(pageData);
};