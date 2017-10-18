import { unset, set, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import axios from 'axios';
import md5 from 'md5';

export let doneSharing = [
  set(state`sharing_dialog.trellis_domain_text`, ''),
  set(state`sharing_dialog.username_text`, ''),
	toggle(state`sharing_dialog.open`),
	unset(state`sharing_dialog.add_user_error`),
]

export let showSharingDialog = [
  toggle(state`sharing_dialog.open`),
]

export let setUsernameText = [
  set(state`sharing_dialog.username_text`, props`text`),
]

export let setUrlText = [
  set(state`sharing_dialog.trellis_domain_text`, props`text`),
]

export let addUser = [
	//try to get current user
	createClientUser, {
		success: [
			set(state`client_panel.clients.${state`client_panel.selected_client`}._meta._permissions.${props`user._id`}`, props`user`),
		  addPermissions, {
				success: [
				  set(state`sharing_dialog.trellis_domain_text`, ''),
					set(state`sharing_dialog.username_text`, ''),
	      ],
				error: [
					set(state`sharing_dialog.add_user_error`, 'Unable to share with this user')
				],
			},
		],
		error: [
			set(state`sharing_dialog.add_user_error`, 'User not found with matching username and trellis domain')
		],
	}
]

function createClientUser({state, props, path}) {
  let domain = state.get('app.oada_domain')
	let oidc = {
		username: state.get(`sharing_dialog.username_text`),
		iss: state.get(`sharing_dialog.trellis_domain_text`)
	}
	return axios({
		method: 'post',
		url: domain+'/users',
		headers: {
			'Content-Type': 'application/vnd.oada.client.1+json',
			'Authorization': 'Bearer '+state.get('user_profile.user.token'),
		},
		data: {
			username: md5(JSON.stringify(oidc)),
			oidc
    },
  }).then((response) => {
		return axios({
			method: 'get',
			url: domain+response.headers.location,
			headers: {
				'Authorization': 'Bearer '+state.get('user_profile.user.token'),
			},
		}).then((res) => {
			return path.success({user:res.data})
		}).catch((err) => {
			return path.error({err})
		})
	}).catch((err) => {
		return path.error({err})
	})
}

function addPermissions({state, props, path}) {
  let domain = state.get('app.oada_domain')
  let clientId = state.get('client_panel.selected_client')
	
  return axios({
    method: 'put',
    url: domain+'/bookmarks/fpad/clients/'+clientId+'/_meta/_permissions',
    headers: {
      'Content-Type': 'application/vnd.fpad.client.1+json',
      'Authorization': 'Bearer '+state.get('user_profile.user.token'),
    },
    data: { 
      [props.user._id]: {
        read: true,
        write: true, 
        owner: false
      }
    }
	}).then((res) => {
	  return path.success({clientId, user:res.body })
  })
}
