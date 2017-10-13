import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import { fpadDomains, metadata } from '../../../config.js';
import jwtDecode from 'jwt-decode'

//import oadaIdClient from 'oada-id-client'
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getOadaToken({state, props, path}) {
	let domain = fpadDomains[0];
  let host = domain.replace(/^https?:\/\//, '')
  let options = {
    metadata,
    scope: 'fpad:all',
    redirect: jwtDecode(metadata).redirect_uris[0],
  }
	return getAccessToken(host, options).then((accessToken) => {
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

export default [
	getOadaToken, {
		success: [
		  set(state`UserProfile.user`, props`user`),
		],
		error: [],
	},
]
