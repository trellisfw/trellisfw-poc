/*
  - Do oauth to get token at domain.
  - Use token to create webhook
  - Create /bookmarks/fpad/connections if does not exists
  - Add webhook to /bookmarks/fpad/connections
*/
import { set, unset } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import url from 'url';
import createResource from '../../../OADA/factories/createResource';
import doesResourceExist from '../../../OADA/factories/doesResourceExist';
import post from '../../../OADA/factories/post';
import loadConnections from '../../actions/loadConnections'

import {oadaDomain, redirectDomain, metadata} from '../../../../config';
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getRemoteDomain({props, state}) {
  const remoteURL = url.parse(state.get(`Connections.newConnections.${props.newConnectionId}.domain`));
  return {remoteOadaDomain: remoteURL.protocol + '//' + remoteURL.host};
}
function getOadaToken({props, path}) {
  let options = {
    metadata: metadata,
    scope: 'fpad:all',
    redirect: redirectDomain
  };
  let remoteOadaDomain = props.remoteOadaDomain;
  return getAccessToken(remoteOadaDomain.substr(remoteOadaDomain.indexOf('://')+3), options).then((accessToken) => {
    //Have accessToken
    return path.success({accessToken: accessToken.access_token});
  });
}
function createWebhook({props, state}) {
  /*
    POST to: `_meta/_remote_syncs`:
    {
      "token": "Bearer ggg",
      "url": "bookmarks/fpad/certifications",
      "domain": "localhost"
    }
  */
  return axios({
     method: 'POST',
     url: props.remoteOadaDomain+'/bookmarks/fpad/certifications/_meta/_remote_syncs',
     headers: {Authorization: props.accessToken},
     data: {
       token: 'Bearer '+ state.get('UserProfile.user.token'),
       domain: oadaDomain.substr(oadaDomain.indexOf('://')+3),
       url: 'bookmarks/fpad/certifications'
     }
  }).then((response)=> {
    console.log('Alex Webhook Response', response);
    var id = response.headers.location.split('/')
    id = id[id.length-1]
    return {remoteWebhookId: id};
  });
}

function completeConnection(test) {
  console.log('Connection complete!');
}

export default [
  set(props`newConnectionId`, props`id`),
  getRemoteDomain,
  getOadaToken, {
    success: [
      createWebhook,
      doesResourceExist({path: '/bookmarks/fpad/connections'}), {
        yes: [],
        no: createResource({path: '/bookmarks/fpad/connections'})
      },
      //Save the connection to oada
      post({
        path: '/bookmarks/fpad/connections',
        data: {url: props`remoteOadaDomain`, remoteWebhookId: props`remoteWebhookId`}
      }),
      loadConnections,
      unset(state`Connections.newConnections.${props`newConnectionId`}`),
      completeConnection
    ],
    error: [] //Failed to get oada token
  }
]
