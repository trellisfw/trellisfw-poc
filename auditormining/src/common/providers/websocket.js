import Promise  from 'bluebird';
const uuid = require('uuid/v4');
var cachedProvider = null;

function websocketClient(context, config) {
    //Create the message queue
    var messages = [];
    //Create the socket
    var socket = new WebSocket('wss://'+config.url);
    var connected = false;
    var httpCallbacks = {};
    var watchSignals = {};

    socket.onopen = function(event) {
      connected = true;
      sendMessages();
    }
    socket.onmessage = function(event) {
      var response = JSON.parse(event.data);
      //Look for id in httpCallbacks
      if (response.requestId) {
        if (httpCallbacks[response.requestId]) {
          //Resolve Promise
          httpCallbacks[response.requestId].resolve(response);
          delete httpCallbacks[response.requestId];
        } else if (watchSignals[response.requestId]) {
          if (watchSignals[response.requestId].resolve) {
            if (response.status === 'success') {
              //Successfully setup websocket, resolve promise
              watchSignals[response.requestId].resolve(response);
            } else {
              watchSignals[response.requestId].reject(response);
            }
            //Remove resolve and reject so we process change as a signal next time
            delete watchSignals[response.requestId]['resolve'];
            delete watchSignals[response.requestId]['reject'];
          } else {
            //Call signal assigned during .watch() passing response
            context.controller.getSignal(watchSignals[response.requestId].signalPath)({response});
          }
        }
      }
    }

    function sendMessages() {
      if (!connected) return;
      messages.forEach((message) => {
        socket.send(JSON.stringify(message));
      });
      messages = [];
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
        }
        messages.push(message);
        httpCallbacks[message.requestId] = {
          resolve: resolve,
          reject: reject
        };
        sendMessages();
      });
    }

    function _watch(request, signalPath) {
      //Watch for changes on requested resource and trigger provided signal
      return new Promise((resolve, reject) => {
        let message = {
          requestId: uuid(),
          method: 'watch',
          path: request.url
        };
        if (request.headers && request.headers.Authorization) {
          message.authorization = request.headers.Authorization;
        }
        messages.push(message);
        watchSignals[message.requestId] = {signalPath, resolve, reject};
        sendMessages();
      });
    }

    function _close() {
      //TODO reject all callbacks that have not resolved
      //Clear everything
      messages = [];
      httpCallbacks = {};
      watchSignals = {};
      //Close socket
      socket.close();
    }

    return {
      http: _http,
      close: _close,
      watch: _watch
    }
}


function createProvider(context, config) {
  var provider = {};
  if (config) {
    provider = websocketClient(context, config);
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
