import axios from 'axios';
import {oadaDomain} from '../../../config';
import _ from 'lodash';

/*
  Post to a resource on oada cloud

  Parameters:
    Required:
      `path`,
      `data`
    Optional:
      `contentType`,
      `domain`,
      `token`,
      `funcMode`
*/

function postFactory ({path: resPath, domain, token, data, funcMode, headers}) {
  function post({state, resolve, path, websocket}) {
    return Promise.resolve().then(() => {
      //Remove the path if we are running in function mode, so paths in original action work
      if (funcMode) path = null;
      //Resolve path, domain, and token values if they are tags
      resPath = resolve.value(resPath);
      domain = resolve.value(domain) || oadaDomain;
      token = resolve.value(token) || state.get('UserProfile.user.token')
      //Resolve data value or values if they are tags
      if (resolve.isTag(data)) data = resolve.value(data);
      if (_.isObject(data)) data = _.mapValues(data, (value) => {return resolve.value(value)});
      //Resolve headers value or values if they are tags
      if (resolve.isTag(headers)) headers = resolve.value(headers);
      if (_.isObject(headers)) headers = _.mapValues(headers, (value) => {return resolve.value(value)});
      /*
        - Execute post -
        Use axios if our websocket isn't configured, or isn't configured for the
        correct domain
      */
      if (resPath == null) throw new Error('`path` is required to post.');
      if (data == null) throw new Error('`data` is required to post.');
      let url = domain+resPath;
      let request = (websocket === null || websocket.url() !== domain) ? axios : websocket.http;
      return request({
        method: 'POST',
        url: url,
        headers: _.merge({Authorization: 'Bearer '+token}, headers),
        data: data
      }).then((response) => {
        if (path) return path.success({response});
        return {response};
      }).catch((error) => {
        console.log('err', error);
        if (path) return path.error({error});
        throw error;
      });
    });
  }
  return post
}

postFactory.func = function func(args) {
  function post(options) {
    options.funcMode = true;
    return postFactory(options)(args[0]);
  }
  return post;
}

export default postFactory;
