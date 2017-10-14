import axios from 'axios';
import {oadaDomain} from '../../../config';

/*
  Create a resource on oada cloud and link it to `path`

  Parameters:
    Required:
      `path`
    Optional:
      `domain`,
      `contentType`,
      `token`
*/

function _createResource({domain, path, contentType, token}) {
  return axios({
    method: 'POST',
    url: domain+'/resources',
    headers: {
      Authorization: 'Bearer '+token,
      'Content-Type': contentType
    },
    data: {}
  }).then((response) => {
    var id = response.headers.location.split('/')
    id = id[id.length-1]
    return axios({
      method: 'PUT',
      url: domain+path,
      headers: {
        Authorization: 'Bearer '+token,
        'Content-Type': contentType
      },
      data: {
        _id:'resources/'+id,
        _rev: '0-0'
      }
    });
  });
}

function createResourceFactory ({path, domain, contentType, token}) {
  function createResource({state, resolve}) {
    path = resolve.value(path);
    //TODO require contentType (don't default)
    contentType = resolve.value(contentType) || 'application/vnd.fpad.certifications.globalgap.1+json';
    token = resolve.value(token) || state.get('UserProfile.user.token')
    domain = resolve.value(domain) || oadaDomain;
    return _createResource({domain, path, token, contentType});
  }
  return createResource
}

export default createResourceFactory;
