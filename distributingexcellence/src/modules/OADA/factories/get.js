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
      if (funcMode) path = null;
      //Resolve path, domain, and token values if they are tags
      resPath = resolve.value(resPath);
      domain = resolve.value(domain) || oadaDomain;
      token = resolve.value(token) || state.get('UserProfile.user.token')
      /*
        - Execute get -
        Use axios if our websocket isn't configured, or isn't configured for the
        correct domain
      */
      let url = domain+resPath;
      let request = (websocket === null || websocket.url() !== domain) ? axios : websocket.http;
      return request({
        method: 'GET',
        url: url,
        headers: {
          Authorization: 'Bearer '+token
        }
      }).then((response) => {
        if (path) return path.success({response});
        return {response};
      }).catch((error) => {
        if (path) return path.error({error});
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
