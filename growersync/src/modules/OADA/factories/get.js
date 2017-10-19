import axios from 'axios';
import {oadaDomain} from '../../../config';

/*
  GET a resource on oada cloud, using websocket if available

  Parameters:
    Required:
      `path`
    Optional:
      `domain`,
      `token`
*/

function getFactory ({path: resPath, domain, token, funcMode}) {
  function get({state, resolve, path, websocket}) {
    return Promise.resolve().then(() => {
      //Remove the path if we are running in function mode, so paths in original action work
      let _path = (funcMode) ? null : path;
      //Resolve path, domain, and token values if they are tags
      let _resPath = resolve.value(resPath);
      let _domain = resolve.value(domain) || oadaDomain;
      console.log('Token1:', token);
      let _token = resolve.value(token) || state.get('UserProfile.user.token')
      console.log('Token2:', _token);
      console.log('State Token:', state.get('UserProfile.user.token'));
      /*
        - Execute get -
        Use axios if our websocket isn't configured, or isn't configured for the
        correct domain
      */
      let url = _domain+_resPath;
      let request = (websocket === null || websocket.url() !== _domain) ? axios : websocket.http;
      return request({
        method: 'GET',
        url: url,
        headers: {
          Authorization: 'Bearer '+_token
        }
      }).then((response) => {
        if (_path) return _path.success({response});
        return {response};
      }).catch((error) => {
        if (_path) return _path.error({error});
        throw error;
      });
    });
  }
  return get
}

getFactory.func = function func(args) {
  function get(options) {
    options.funcMode = true;
    return getFactory(options)(args[0]);
  }
  return get;
}

export default getFactory;
