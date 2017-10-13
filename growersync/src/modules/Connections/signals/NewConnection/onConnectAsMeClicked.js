/*
  - Do oauth to get token at domain.
  - Use token to create webhook of config.webhookType at domain to config.oadaDomain
  - If webhookType `oada-put`:
    - Use token to copy all existing certifications from domain
*/
import { equals } from 'cerebral/operators'
import { props } from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import url from 'url';
import _ from 'lodash';

import loadCertifications from '../../../App/actions/loadCertifications.js';


import {oadaDomain, redirectDomain, metadata, webhookType} from '../../../../config';
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getRemoteDomain({props, state}) {
  const remoteURL = url.parse(state.get(`Connections.newConnections.${props.id}.domain`));
  return {remoteOadaDomain: remoteURL.protocol + '//' + remoteURL.host};
}
function getWebhookType() {
  return {webhookType};
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

function createWebhookTypeOadaPut({props, state}) {
  /*
    POST to: `_meta/_syncs`:
    {
      "oada-put": true,
      "headers": {
        "Authorization": "Bearer ggg"
      },
      "url": "https://localhost/bookmarks/fpad/certifications"
    }
  */
  return axios({
     method: 'POST',
     url: props.remoteOadaDomain+'/bookmarks/fpad/certifications/_meta/_syncs',
     headers: {Authorization: props.accessToken},
     data: {
       "oada-put": true,
       "headers": {
         "Authorization": 'Bearer '+ state.get('UserProfile.user.token')
       },
       "url": oadaDomain+"/bookmarks/fpad/certifications"
     }
  }).then((response)=> {
    console.log('Webhook Response', response);
  });
}
function copyCertsFromRemote({props, state}) {
  return axios({
     method: 'GET',
     url: props.remoteOadaDomain+'/bookmarks/fpad/certifications',
     headers: {Authorization: 'Bearer '+props.accessToken},
  }).then((res) => {
    //Extract only list of certification ids
    let certKeys = _.filter(Object.keys(res.data || {}), key=>(_.startsWith(key, '_')===false));
    return Promise.map(certKeys, (key) => {
      //Load the certifications
      return axios({
        method: 'GET',
        url: props.remoteOadaDomain+'/bookmarks/fpad/certifications/'+key,
        headers: {Authorization: 'Bearer '+props.accessToken}
      }).then((res) => {
        //Create a resource by POSTing to resources
        //Remove _id, _rev, _meta, and _type
        var data = _.omit(res.data, ['_id', '_rev', '_meta', '_type']);
        return axios({
          method: 'POST',
          url: oadaDomain+'/resources',
          headers: {
            Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
            'Content-Type': 'application/vnd.fpad.audit.globalgap.1+json'
          },
          data: data
        }).then((res) => {
          //Link resource to /bookmarks/fpad/certifications with PUT
          var id = res.headers.location.split('/')
          id = id[id.length-1];
          return axios({
            method: 'PUT',
            url: oadaDomain+'/bookmarks/fpad/certifications/'+id,
            headers: {
              Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
              'Content-Type': 'application/vnd.fpad.audit.globalgap.1+json'
            },
            data: {_id:'resources/'+id, _rev: '0-0'}
          });
        });
      });
    }, {concurrency: 5}).then(() => {
      return {};
    });
  });
}

function createWebhookTypeAlex() {
  /*
  TODO
    POST to: `_meta/_remote_syncs`:
    {
      "token": "Bearer ggg",
      "url": "bookmarks/fpad/certifications",
      "domain": "localhost"
    }
  */
}

function completeConnection() {
  console.log('Connection complete!');
}

export default [
  getRemoteDomain,
  getOadaToken, {
    success: [
      getWebhookType,
      equals(props`webhookType`), {
        'oada-put': [
          createWebhookTypeOadaPut,
          copyCertsFromRemote,
          loadCertifications
        ],
        alex: [
          createWebhookTypeAlex
        ],
        otherwise: []
      },
      completeConnection
    ],
    error: [] //Failed to get oada token
  }
]
