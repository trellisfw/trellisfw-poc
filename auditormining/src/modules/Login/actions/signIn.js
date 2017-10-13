import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import {redirectDomain, metadata} from '../../../config';
import configureWebsocketProvider from './configureWebsocketProvider';
import loadCertificationsWebsocket from '../../App/actions/loadCertificationsWebsocket';
import changePage from '../../App/factories/changePage';

let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getOadaToken({state, props, path}) {
  let options = {
    metadata: metadata,
    scope: 'fpad:all',
    redirect: redirectDomain
  }
  const fpadDomain = state.get('Login.fpadDomain');
  return getAccessToken(fpadDomain.substr(fpadDomain.indexOf('://')+3), options).then((accessToken) => {
    return axios({
       method: 'GET',
       url: fpadDomain+'/users/me',
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
      changePage('auditors'),
      configureWebsocketProvider,
      loadCertificationsWebsocket
		],
		error: [],
	},
]
