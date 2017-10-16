import post from './post';
import put from './put';
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

function _createResource({domain, path, contentType, token, args}) {
  /*
  return axios({
    method: 'POST',
    url: domain+'/resources',
    headers: {
      Authorization: 'Bearer '+token,
      'Content-Type': contentType
    },
    data: {}
  })
  */
  //Remove the path if we are running in function mode, so paths in original action work
  console.log('Create resource', contentType);
  return post.func(args)({
    domain,
    token,
    path: '/resources',
    headers: {
      'Content-Type': contentType
    },
    data: {}
  }).then(({response}) => {
    console.log('Created', response);
    var id = response.headers.location.split('/')
    id = id[id.length-1]

    return put.func(args)({
      domain,
      path,
      token,
      headers: {
        'Content-Type': contentType
      },
      data: {
        _id:'resources/'+id,
        _rev: '0-0'
      }
    });

    /*return axios({
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
    });*/
  });
}

function createResourceFactory ({path, domain, contentType, token}) {
  function createResource({state, resolve}) {
    //TODO require contentType (don't default)
    contentType = resolve.value(contentType) || 'application/vnd.fpad.certifications.globalgap.1+json';
    return _createResource({domain, path, token, contentType, args: arguments});
  }
  return createResource
}

createResourceFactory.func = function func(args) {
  function createResource(options) {
    return createResourceFactory(options)(args[0]);
  }
  return createResource;
}

export default createResourceFactory;
