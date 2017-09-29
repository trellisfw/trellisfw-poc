import Promise  from 'bluebird';
const uuid = require('uuid/v4');
var cachedProvider = null;

function websocketClient(config) {
    //Create the message queue
    var messages = [];
    //Create the socket
    var socket = new WebSocket('wss://'+config.url);
    var connected = false;
    var httpCallbacks = {};

    socket.onopen = function(event) {
      connected = true;
      sendMessages();
    }
    socket.onmessage = function(event) {
      var response = JSON.parse(event.data);
      //Look for id in httpCallbacks
      if (response.requestId && httpCallbacks[response.requestId]) {
        //Resolve Promise
        httpCallbacks[response.requestId].resolve(response);
        delete httpCallbacks[response.requestId];
      }
    }

    function sendMessages() {
      if (!connected) return;
      messages.forEach((message) => {
        socket.send(JSON.stringify(message));
      });
    }

    function _http(request) {
      //Do a HTTP request
      return new Promise((resolve, reject) => {
        let message = {
          requestId: uuid(),
          method: request.method.toLowerCase(),
          path: request.url
        };
        if (request.headers && request.headers.Authorization) {
          message.authorization = request.headers.Authorization;
        };
        messages.push(message);
        httpCallbacks[message.requestId] = {
          resolve: resolve,
          reject: reject
        };
        sendMessages();
      });
    }

    function _close() {
      //TODO reject all callbacks that have not resolved
      //Clear everything
      messages = [];
      httpCallbacks = {};
      //Close socket
      socket.close();
    }

    return {
      http: _http,
      close: _close
    }
}


function createProvider(context, config) {
  var provider = {};
  if (config) {
    provider = websocketClient(config);
  }
  provider.configure = function configure(config) {
    cachedProvider = createProvider(context, config);
    return;
  }
  return provider;
}

function websocket (context) {
  context.websocket = cachedProvider = (cachedProvider || createProvider(context));
  if (context.debugger) {
    context.debugger.wrapProvider('websocket');
  }
  return context;
}

export default websocket;
