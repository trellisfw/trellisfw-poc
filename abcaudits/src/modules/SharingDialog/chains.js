import randCert from 'fpad-rand-cert'
import { set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';
import Promise from 'bluebird';
import axios from 'axios';
let agent = require('superagent-promise')(require('superagent'), Promise);

export let doneSharing = [
  set(state`sharing_dialog.url_text`, ''),
  set(state`sharing_dialog.username_text`, ''),
  toggle(state`sharing_dialog.open`),
]

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

export let addUser = [
	//try to get current user
	createClientUser, {
		success: [
		  addPermissions, {
				success: [
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
			'Content-Type': 'application/vnd.oada.client.1+json',
			'Authorization': 'Bearer '+state.get('user_profile.user.token'),
		},
		data: {
//                  oadaid: state.get(`client_panel.client_dialog.selected_client`), 
			username: state.get(`sharing_dialog.username_text`),
      name: state.get(`sharing_dialog.username_text`),
      password: 'test'
    },
  }).then((response) => {
		console.log(response)
		return axios({
			method: 'get',
			url: 'https://'+domain+response.headers.location,
			headers: {
				'Authorization': 'Bearer '+state.get('user_profile.user.token'),
			},
		}).then((res) => {
			console.log(res)
			return path.success({user:res})
		})
	  return path.success({})
	})
}

function addPermissions({state, props, path}) {
  let domain = state.get('app.oada_domain')
  let clientId = state.get('client_panel.selected_client')
  return axios({
    method: 'put',
    url: 'https://'+domain+'/bookmarks/fpad/clients/'+clientId+'/_meta/_permissions',
    headers: {
      'Content-Type': 'application/vnd.fpad.client.1+json',
      'Authorization': 'Bearer '+state.get('user_profile.user.token'),
    },
    data: { 
      [props.user._key]: {
        read: true,
        write: true, 
        owner: false
      }
    }
	}).then((res) => {
	  return path.success({clientId, user:res.body })
  })
}
