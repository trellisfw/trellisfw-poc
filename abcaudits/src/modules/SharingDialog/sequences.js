import { unset, set, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import { sequence } from 'cerebral'
import axios from 'axios';
import md5 from 'md5';

export const sharingDialogDoneClicked = sequence('sharing_dialog.sharingDialogDoneClicked', [
  set(state`sharing_dialog.trellis_domain_text`, ''),
  set(state`sharing_dialog.username_text`, ''),
	toggle(state`sharing_dialog.open`),
	unset(state`sharing_dialog.add_user_error`),
])

export const shareClientButtonClicked = sequence('shareClientButtonClicked', [
  toggle(state`sharing_dialog.open`),
])

export const usernameTextChanged = sequence('usernameTextChanged', [
  set(state`sharing_dialog.username_text`, props`text`),
])

export const urlTextChanged = sequence('urlTextChanged', [
  set(state`sharing_dialog.trellis_domain_text`, props`text`),
])

export const addUserButtonClicked = sequence('addUserButtonClicked', [
	//try to get current user
	createClientUser,
  addPermissions,
])

function createClientUser({state, props}) {
  let domain = state.get('oada_domain')
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
			state.set(`client_panel.clients.${state.get(`client_panel.selected_client`)}._meta._permissions.${res.data._id}`, res.data)
			return {user:res.data}
		})
	}).catch((err) => {
		state.set(`sharing_dialog.add_user_error`, 'User not found with matching username and trellis domain')
		return
	})
}

function addPermissions({state, props}) {
  let domain = state.get('oada_domain')
  let clientId = state.get('client_panel.selected_client')
	
  return axios({
    method: 'put',
    url: domain+'/bookmarks/trellis/clients/'+clientId+'/_meta/_permissions',
    headers: {
      'Content-Type': 'application/vnd.trellis.client.1+json',
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
		state.set(`sharing_dialog.trellis_domain_text`, '')
		state.set(`sharing_dialog.username_text`, '')
	  return {clientId, user:res.body }
  }).catch(() => {
	  state.set(`sharing_dialog.add_user_error`, 'Unable to share with this user')
    return
  })
}
