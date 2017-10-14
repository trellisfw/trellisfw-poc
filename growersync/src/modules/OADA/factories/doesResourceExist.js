import axios from 'axios';
import {oadaDomain} from '../../../config';

/*
  Checks if a resource exists at an OADA cloud

  Parameters:
    Required:
      `path`
    Optional:
      `domain`,
      `token`

  Response:
    path: `yes`, `no`, `error`
*/

function checkIfExists({domain, token, path}) {
  return axios({
    method: 'HEAD',
    url: domain+path,
    headers: {
      Authorization: 'Bearer '+token
    }
  }).then((res) => {
    return true;
  }).catch((error) => {
    if (error.response && error.response.status === 404) return false;
    throw error;
  });
}

function doesResourceExistFactory ({path: resPath, domain, token}) {
  function doesResourceExist({state, path, resolve}) {
    //Resolve arguments if they are tags, or provide defaults
    resPath = resolve.value(resPath);
    token = resolve.value(token) || state.get('UserProfile.user.token')
    domain = resolve.value(domain) || oadaDomain;
    //Check if exists
    return checkIfExists({domain, path: resPath, token}).then((exists) => {
      if (!path) return {resourceExists: exists};
      if (exists) return path.yes();
      return path.no();
    }).catch((error) => {
      if (path) return path.error({error});
      throw error;
    });
  }
  return doesResourceExist
}

export default doesResourceExistFactory;
