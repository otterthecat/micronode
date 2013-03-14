var appServer = require('./server/server.js');
var router = require('./server/router.js');

// passing port number and routing object
// init the server
appServer.startUp(8080, router);