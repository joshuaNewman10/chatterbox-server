var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/JSON"
};
var objectId = 1;

var dataStore = {
  messages: []
};

var actions = {
  POST: function(request, response) {
    getData(request, function(data) {
      dataStore.messages.push(data);
      objectId = ++objectId;
      sendResponse(response, {objectId: objectId}, 201 );
    });
  },
  GET: function(request, response) {
    sendResponse(response, {results: dataStore.messages}, 200);
  },
  OPTIONS: function(request, response) {
    sendResponse(response, 200);
  }
};

var getData = function(request, callback ) {
  var data = '';
  request.on('data', function(chunks) {
    data +=chunks;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
}

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var requestHandler = function(request, response) {

  if ( !actions[request.method] ) {
    sendResponse(response, 'hello world', 404);
  } else {
    actions[request.method](request, response);
  }

};



exports.requestHandler = requestHandler;
exports.sendResponse = sendResponse;
