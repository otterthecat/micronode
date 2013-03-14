var http = require('http');
var url  = require('url');

// TODO - server.js should take an options obj to have more custom params

function startUp(portNumber, router){

	function onRequest(req, res){

		// TODO  - response should be fully passed to router (no partial writes between the two)
		// TODO  - path/pathname should be handled in new module and check if path exists prior to routing

		res.writeHeader(200, {'Content-Type': 'text/html'});

		path = url.parse(req.url).pathname;

		router.route(path, function(html){

			res.write(html);
			res.end();
		});

	}

	server = http.createServer(onRequest);
	server.listen(portNumber);
}

exports.startUp = startUp;