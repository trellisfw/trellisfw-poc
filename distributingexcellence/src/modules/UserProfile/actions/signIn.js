import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import {oadaDomain, redirectDomain, metadata} from '../../../config';
import initialize from '../../App/actions/initialize.js';
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getOadaToken({state, props, path}) {
  let options = {
    metadata: metadata,
    scope: 'trellisfw:all',
    redirect: redirectDomain
  }
  return getAccessToken(oadaDomain.substr(oadaDomain.indexOf('://')+3), options).then((accessToken) => {
    return axios({
       method: 'GET',
       url: oadaDomain+'/users/me',
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
      initialize
		],
		error: [],
	},
]
