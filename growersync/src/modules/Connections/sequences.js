/*
  - Do oauth to get token at domain.
  - Use token to create webhook
  - Create /bookmarks/trellis/connections if does not exists
  - Add webhook to /bookmarks/trellis/connections
*/
import { set, unset } from 'cerebral/operators'
import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import Promise from 'bluebird'
import url from 'url'
import _ from 'lodash';
import uuid from 'uuid';

import {oadaDomain, defaultNewConnectionURL, redirectDomain, metadata} from '../../config';

import createResource from '../OADA/factories/createResource';
import doesResourceExist from '../OADA/factories/doesResourceExist'
import get from '../OADA/factories/get';
import post from '../OADA/factories/post'

function watchConns({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/trellis/connections',
    headers: {Authorization: 'Bearer '+ state.get('user_profile.user.token')}
  }, 'Connections.connectionsChanged');
}

export const watchConnections =  sequence('watchConnections', [
  doesResourceExist({path: '/bookmarks/trellis/connections'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/trellis/connections',
        contentType: 'application/vnd.trellis.certifications.globalgap.1+json'
      })
    ]
  },
  watchConns
])

export function removeConnectionsFromState({state, props}) {
  let keys = props.ids || [];
  keys.forEach((key) => {
    state.unset('Connections.connections.'+key);
  });
}

export function loadConnectionsByIds({state, props, path, websocket}) {
  //Get the connections with the props.ids and merge them into state
  return Promise.map(props.ids, (key) => {
    //Load the connections
    return get.func(arguments)({
      path: '/bookmarks/trellis/connections/'+key
    }).then(({response}) => {
      state.set('Connections.connections.'+key, response.data);
    });
  }, {concurrency: 5}).then(() => {
    return {};
  });
}

function parseConnections({props, state}) {
  //Add connections to state
  _.map(props.response.data, (connection, key) => {
    if (_.startsWith(key, '_') === false) state.set(`Connections.connections.${key}`, connection);
  });
}

function loadConns({path}) {
  return get.func(arguments)({path: '/bookmarks/trellis/connections'}).then(({response}) => {
    return path.success({response});
  }).catch((error) => {
    return path.error({error});
  });
}

export const loadConnections = sequence('connections.loadConnections', [
  loadConns,
  {
    success: [
      parseConnections
    ],
    error: []
  }
]);

function parseAuthorizedApps({props, state}) {
  //Add connections to state
  let apps = {};
  _.map(props.response.data, (app, key) => {
    if (_.get(app, 'client.client_name') === null) return;
    let createTime = _.get(app, 'createTime') || 0;
    let expiresIn = _.get(app, 'expiresIn') || 0;
    let timeNow = new Date().getTime();
    if (createTime + (expiresIn*1000) < timeNow) {
      return;
    }
    let name = _.get(app, 'client.client_name');
    if (apps[name] == null) {
      apps[name] = true;
      state.set(`Connections.authorizedApps.${key}`, app);
    }
  });
}

function getAuthorizedApps({path}) {
  return get.func(arguments)({path: '/authorizations'}).then(({response}) => {
    return path.success({response});
  }).catch((error) => {
    return path.error({error});
  });
}

export const loadAuthorizedApps = sequence('connections.loadAuthorizedApps', [
  getAuthorizedApps,
  {
    success: [
      parseAuthorizedApps
    ],
    error: []
  }
]);
function createWebhook({props, state}) {
  /*
    POST to: `_meta/_remote_syncs`:
    {
      "token": "Bearer ggg",
      "url": "bookmarks/trellis/certifications",
      "domain": "localhost"
    }
  */
  return post.func(arguments)({
     domain: props.remoteOadaDomain,
     token: props.accessToken,
     path: '/bookmarks/trellis/certifications/_meta/_remote_syncs',
     data: {
       token: 'Bearer '+ state.get('user_profile.user.token'),
       domain: oadaDomain.substr(oadaDomain.indexOf('://')+3),
       url: 'bookmarks/trellis/certifications'
     }
  }).then(({response})=> {
    var id = response.headers.location.split('/')
    id = id[id.length-1]
    return {remoteWebhookId: id};
  });
}

export const createCertificationsWebhook = sequence('createCertificationsWebhook', [
  doesResourceExist({
    token: props`accessToken`,
    domain: props`remoteOadaDomain`,
    path: '/bookmarks/trellis/certifications'
  }),
  {
    yes: [],
    no: [
      createResource({
        token: props`accessToken`,
        domain: props`remoteOadaDomain`,
        path: '/bookmarks/trellis/certifications',
        contentType: 'application/vnd.trellis.certifications.globalgap.1+json'
      })
    ]
  },
  createWebhook
])
export function addConnectionClicked ({state}) {
  state.set(`Connections.newConnections.${uuid()}`, {domain: defaultNewConnectionURL})
}

export function onEmailLinkClicked ({state}) {
}

function connsChanged ({props, path}) {
  if (props.response.merge) {
    //Get all the ids of the certifications that have updated revs
    let certIds = _.filter(Object.keys(props.response.merge), key=>(_.startsWith(key, '_')===false));
    return path.merge({ids: certIds});
  } else if (props.response.delete) {
    //Get all the ids of the certifications that have been deleted
    let certIds = _.filter(Object.keys(props.response.delete), key=>(_.startsWith(key, '_')===false));
    return path.delete({ids: certIds});
  }
  return path.unknown();
}

export const connectionsChanged = sequence('connections.connectionsChanged', [
  connsChanged,
  {
		merge: [
      loadConnectionsByIds
    ],
		delete: [
      removeConnectionsFromState
    ],
    unknown: []
	}
]);

let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getRemoteDomain({props, state}) {
  const remoteURL = url.parse(state.get(`Connections.newConnections.${props.newConnectionId}.domain`));
  return {remoteOadaDomain: remoteURL.protocol + '//' + remoteURL.host};
}
function getOadaToken({props, path}) {
  let options = {
    metadata: metadata,
    scope: 'trellis:all',
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

export const onConnectAsMeClicked = sequence('connections.onConnectAsMeClicked', [
  set(props`newConnectionId`, props`id`),
  getRemoteDomain,
  getOadaToken, {
    success: [
      createCertificationsWebhook,
      //Save the connection to oada
      post({
        path: '/bookmarks/trellis/connections',
        data: {url: props`remoteOadaDomain`, remoteWebhookId: props`remoteWebhookId`}
      }),
      unset(state`Connections.newConnections.${props`newConnectionId`}`),
      completeConnection
    ],
    error: [] //Failed to get oada token
  }
])

export function onDomainChanged({state, props}) {
  state.set(`Connections.newConnections.${props.id}.domain`, props.domain)
}
