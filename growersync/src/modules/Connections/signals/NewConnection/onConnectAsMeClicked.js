/*
  - Do oauth to get token at domain.
  - Use token to create webhook
  - Create /bookmarks/fpad/connections if does not exists
  - Add webhook to /bookmarks/fpad/connections
*/
import { set, unset } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
import getToken from '../../../OADA/factories/getToken'
import getOadaBaseURI from '../../../OADA/factories/getOadaBaseURI'
import post from '../../../OADA/factories/post'
import createCertificationsWebhook from '../../actions/createCertificationsWebhook'

function completeConnection() {
  console.log('Connection complete!');
}

export default [
  set(props`newConnectionId`, props`id`),
  getOadaBaseURI({domain: state`Connections.newConnections.${props`newConnectionId`}.domain`}),
  getToken({domain: props`baseURI`}), {
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
