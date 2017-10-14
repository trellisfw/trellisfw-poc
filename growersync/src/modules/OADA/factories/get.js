import axios from 'axios';
import {oadaDomain} from '../../../config';

/*
  GET a resource on oada cloud

  Parameters:
    Required:
      `path`
    Optional:
      `domain`,
      `token`
*/

function getFactory ({path: resPath, domain, token}) {
  function get({state, resolve, path}) {
    //Resolve path, domain, and token values if they are tags
    resPath = resolve.value(resPath);
    domain = resolve.value(domain) || oadaDomain;
    token = resolve.value(token) || state.get('UserProfile.user.token')
    //Execute post
    return axios({
      method: 'GET',
      url: domain+resPath,
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
  }
  return get
}

export default getFactory;
