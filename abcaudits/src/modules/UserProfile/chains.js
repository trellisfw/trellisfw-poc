import randCert from 'fpad-rand-cert'
import { unset, set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';
import Promise from 'bluebird';
import axios from 'axios';
import { metadata, redirectDomain } from '../../config'
const URL = require('url').Url
//import oadaIdClient from 'oada-id-client'
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)
let agent = require('superagent-promise')(require('superagent'), Promise);

export let init = [

]

export let signIn = [
	getOadaToken, {
		success: [
		  set(state`user_profile.user`, props`user`),
		],
		error: [],
	},
]

// TODO: fix this, run some actions, maybe init. Call signal??
export let signOut = [
  unset(state`user_profile.user`),
  set(state`client_panel.clients`, {}),
  set(state`app.view.certifications`, {}),
  oadaLogOut,
]

function oadaLogOut({state, props, path}) {
  let domain = state.get('app.oada_domain')
  return axios({
    method: 'GET',
    url: domain+'/oadaauth/logout',
    headers: {
      'Authorization': 'Bearer '+state.get('user_profile.user.token')
    }
  })
}

function getOadaToken({state, props, path}) {
	let domain = state.get('app.oada_domain')
	let host = domain.replace(/^https?:\/\//, '')
	let options = {
		metadata,
    scope: 'fpad:all',
    redirect: redirectDomain,
	}
	return getAccessToken(host, options).then((accessToken) => {
		console.log(domain)
    return axios({
       method: 'GET',
       url: domain+'/users/me',
       headers: {Authorization: accessToken.access_token}
    }).then((response)=> {
      let user = response.data;
      user.token = accessToken.access_token
      return path.success({user});
    })
  })
}
