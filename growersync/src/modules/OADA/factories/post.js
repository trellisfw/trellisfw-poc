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
      `domain`,
      `token`
*/

function postFactory ({path: resPath, domain, token, data}) {
  function post({state, resolve, path}) {
    //Resolve path, domain, and token values if they are tags
    resPath = resolve.value(resPath);
    domain = resolve.value(domain) || oadaDomain;
    token = resolve.value(token) || state.get('UserProfile.user.token')
    //Resolve data value or values if they are tags
    if (resolve.isTag(data)) data = resolve.value(data);
    if (_.isObject(data)) data = _.mapValues(data, (value) => {return resolve.value(value)});
    console.log('Post data:', data);
    console.log('Post domain:', domain);
    //Execute post
    return axios({
      method: 'POST',
      url: domain+resPath,
      headers: {
        Authorization: 'Bearer '+token
      },
      data: data
    }).then((response) => {
      if (path) return path.success({response});
      return {response};
    }).catch((error) => {
      if (path) return path.error({error});
      throw error;
    });
  }
  return post
}

export default postFactory;
