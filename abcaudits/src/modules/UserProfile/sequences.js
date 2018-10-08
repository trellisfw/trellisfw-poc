import { unset, set } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import { sequence } from 'cerebral'
import Promise from 'bluebird';
import axios from 'axios';
import { metadata, redirectDomain } from '../../config'
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

export const signInClicked = sequence('user_profile.signInClicked', [
	getOadaToken,
  set(state`user_profile.user`, props`user`),
])

// TODO: fix this, run some actions, maybe init. Call signal??
export const signOutClicked = sequence('user_profile.signOutClicked', [
  unset(state`user_profile.user`),
  set(state`client_panel.clients`, {}),
  set(state`view.certifications`, {}),
  oadaLogOut,
])

function oadaLogOut({state, props}) {
	let domain = state.get('oada_domain')
	// Make dummy image to go to /oadaauth/logout without using a window
	// eslint-disable-next-line
	let img = (new Image()).src = domain+"/oadaauth/logout";
}

function getOadaToken({state, props}) {
	let domain = state.get('oada_domain')
	let host = domain.replace(/^https?:\/\//, '')
	let options = {
		metadata,
    scope: 'trellis:all',
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
      return {user};
    })
  })
}
