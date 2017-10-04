import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import {domain} from '../../../config.js';
import configureWebsocketProvider from './configureWebsocketProvider';
import loadCertificationsWebsocket from '../../App/actions/loadCertificationsWebsocket';
import changePage from '../../App/factories/changePage';

let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)

function getOadaToken({state, props, path}) {
  let options = {
    metadata: 'eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYWJjYXVkaXRzLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBQkMgQXVkaXRzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiZjk0ZmE3MWMtMWQ2Mi00YjAyLTlhMWItMjcxYTVkZTRjMGEzIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDQ4NDI1Njl9.Yx9-uzUv4IhgXVWmtXZMHYXMXEr7-4Ww2UotLzTTUNYCaGcU8SPtN1aM6SXfCNK7XHgR6xt3viJPUQ_H2ivCugx-bs39Xwof7aV1JH0XBYN3_5EY5_hQmO3H5YBbDBZvygGAs4iLjHY2l_JiU6A5ty1nGxxQRR2kFo3GXiMZQGo',
    scope: 'fpad:all',
    redirect: domain
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
