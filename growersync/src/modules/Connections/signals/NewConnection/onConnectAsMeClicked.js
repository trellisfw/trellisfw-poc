/*
  - Do oauth to get token at domain.
  - Use token to create webhook
  - Create /bookmarks/fpad/connections if does not exists
  - Add webhook to /bookmarks/fpad/connections
*/
import { set, unset } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import Promise from 'bluebird'
import url from 'url'

import post from '../../../OADA/factories/post'
import createCertificationsWebhook from '../../actions/createCertificationsWebhook'
import {redirectDomain, metadata} from '../../../../config';

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
function completeConnection(test) {
  console.log('Connection complete!');
}

export default [
  set(props`newConnectionId`, props`id`),
  getRemoteDomain,
  getOadaToken, {
    success: [
      createCertificationsWebhook,
      //Save the connection to oada
      post({
        path: '/bookmarks/fpad/connections',
        data: {url: props`remoteOadaDomain`, remoteWebhookId: props`remoteWebhookId`}
      }),
      unset(state`Connections.newConnections.${props`newConnectionId`}`),
      completeConnection
    ],
    error: [] //Failed to get oada token
  }
]
