import randCert from 'fpad-rand-cert'
import { set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';
import Promise from 'bluebird';
import axios from 'axios';
let agent = require('superagent-promise')(require('superagent'), Promise);

export let cancelSharing = [
  set(state`sharing_dialog.url_text`, ''),
  set(state`sharing_dialog.username_text`, ''),
  toggle(state`sharing_dialog.open`),
]

export let showSharingDialog = [
  toggle(state`sharing_dialog.open`),
]

export let setUsernameText = [
  set(state`sharing_dialog.username_text`, props`text`),
]

export let setUrlText = [
  set(state`sharing_dialog.url_text`, props`text`),
]

export let submitSharing = [
	createClientUser, {
		success: [
		  addPermissions, {
				success: [
        toggle(state`sharing_dialog.open`),
        set(state`sharing_dialog.url_text`, ''),
        set(state`sharing_dialog.username_text`, ''),
      ],
				error: [],
			},
		],
		error: [],
	}
]

function createClientUser({state, props, path}) {
  let domain = state.get('app.oada_domain')
	return axios({
		method: 'post',
		url: 'https://'+domain+'/users',
		headers: {
			'Content-Type': 'application/vnd.oada.rock.1+json',
			'Authorization': 'Bearer '+state.get('user_profile.user.token'),
		},
		data: {
                  oadaid: state.get(`client_panel.client_dialog.selected_client`), 
                  name: state.get(`client_panel.client_dialog.selected_client`), 
                  username: state.get(`sharing_dialog.username_text`),
                  email: state.get(`sharing_dialog.username_text`),
                  fpad_domain: state.get(`sharing_dialog.url_text`),
                  password: '$2a$10$l64QftVz6.7KR5BXNc29IORcuhcay48jl9f5jb4dOneuGMPcrkCLC'
                },
	}).then((response) => {
          console.log(response)
		return path.success({userid:response.headers.location.replace(/^users\//, '')})
	})
}

function addPermissions({state, props, path}) {
  let domain = state.get('app.oada_domain')
  let clientId = state.get('client_panel.selected_client')
  return axios({
    method: 'put',
    url: 'https://'+domain+'/bookmarks/fpad/clients/'+clientId+'/certifications/_meta/_permissions/users/'+props.userid,
    headers: {
      'Content-Type': 'application/vnd.oada.rock.1+json',
      'Authorization': 'Bearer '+state.get('user_profile.user.token'),
    },
    data: {read: true, write: true, owner: false}
  }).then((response) => {
    return path.success({})
  })
}
