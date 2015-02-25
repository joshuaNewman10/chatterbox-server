/* Import node's http module: */
var http = require("http"); //get http module
var requestHandler = require('./request-handler.js');

var port = 3000;


var ip = "127.0.0.1";




var server = http.createServer(requestHandler.requestHandler); //create a server
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

