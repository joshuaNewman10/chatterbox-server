/* Import node's http module: */
var http = require("http"); //get http module
var urlParser = require('url');
var requestHandler = require('./request-handler.js');

var port = 3000;
var ip = "127.0.0.1";

var routes = {
  '/chat/messages':requestHandler.requestHandler,
  '/classes/room1':requestHandler.requestHandler
};

var server = http.createServer(function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var parts = urlParser.parse(request.url);
  var route = routes[parts.pathname];

  if(route) {
    route(request, response);
  } else {
     requestHandler.sendResponse(response, 'Not Found!', 404);
  }

});


console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
