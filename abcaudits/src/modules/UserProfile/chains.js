import randCert from 'fpad-rand-cert'
import { unset, set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';
import Promise from 'bluebird';
import axios from 'axios';
//import oadaIdClient from 'oada-id-client'
let getAccessToken = Promise.promisify(require('oada-id-client').getAccessToken)
let agent = require('superagent-promise')(require('superagent'), Promise);
let url = 'vip3.ecn.purdue.edu'

export let init = [
	
]

export let signIn = [
	getOadaToken, {
		success: [
		  set(state`user_profile.user`, {token: ''}),
		  set(state`user_profile.user.token`, props`token`),
		],
		error: [],
	},
]

export let signOut = [
  unset(state`user_profile.user`),
]

function getOadaToken({state, props, path}) {
  var options = {
		metadata: 'eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYXBpLm9hZGEtZGV2LmNvbS9mcGFkL2FiY2F1ZGl0cy9wdWJsaWMvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBQkMgQXVkaXRzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vYXBpLm9hZGEtZGV2LmNvbS8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiYWIyMGRiODMtNmZhYS00ZWJlLWEwMTYtNjdmYWMxZDEyYjA2IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDQyOTA2MTB9.V4eeK5qJUTYoMnqdffBPTcYn-oRGZbV6DxEXBClQvQnQ0-AdAUzSUcmkDHl5ExZr1cgFb8Ly4f51wzueSrDjd6wEmgtPzu8oRYhC6qp8Lf1YpXdQaVRabCUn-EOScuJYjJFu8MHKP3wfHmx7T8L4CeHAnNuefz4wyBfOUcoyk2A',
		scope: 'Food_Safety_Certifications',
    redirect: 'http://localhost:3000/oauth2/redirect.html',
	}
	return getAccessToken(url, options).then((accessToken) => {
    return path.success({token:accessToken.access_token});
  })
}
