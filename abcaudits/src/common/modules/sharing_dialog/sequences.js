import { unset, set, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import { sequence } from 'cerebral'
import axios from 'axios';
import md5 from 'md5';
import config from '../../../config';

export const sharingDialogDoneClicked = sequence('sharing_dialog.sharingDialogDoneClicked', [
  set(state`sharing_dialog.trellis_domain_text`, ''),
  set(state`sharing_dialog.username_text`, ''),
	toggle(state`sharing_dialog.open`),
	unset(state`sharing_dialog.add_user_error`),
])

export const shareClientButtonClicked = sequence('shareClientButtonClicked', [
  loadSharingMeta,
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
	let oidc = {
		username: state.get(`sharing_dialog.username_text`),
		iss: state.get(`sharing_dialog.trellis_domain_text`)
  }
  let data = {
	  username: md5(JSON.stringify(oidc)),
    oidc
  }
  if (config.sharePassword) data.password = config.sharePassword;
	return axios({
		method: 'post',
		url: config.oadaDomain+'/users',
		headers: {
			'Content-Type': 'application/vnd.oada.client.1+json',
			'Authorization': 'Bearer '+state.get('user_profile.user.token'),
		},
		data
  }).then((response) => {
		return axios({
			method: 'get',
			url: config.oadaDomain+response.headers.location,
			headers: {
				'Authorization': 'Bearer '+state.get('user_profile.user.token'),
			},
		}).then((res) => {
			return {user:res.data}
		})
	}).catch((err) => {
		state.set(`sharing_dialog.add_user_error`, 'User not found with matching username and trellis domain')
		return
	})
}

function addPermissions({state, props}) {
  let clientId = state.get('client_panel.selected_client')
	
  return axios({
    method: 'put',
    url: config.oadaDomain+'/bookmarks/trellis/clients/'+clientId+'/_meta/_permissions',
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
		state.set(`sharing_dialog.shared_users.${props.user._id}`, props.user)
	  return {clientId }
  }).catch((err) => {
	  state.set(`sharing_dialog.add_user_error`, 'Unable to share with this user')
    return
  })
}

function loadSharingMeta({state, props, path}) {
  return axios({
    method: 'get',
    url: config.oadaDomain+'/bookmarks/trellis/certifications/_meta',
    headers: {
      'Authorization': 'Bearer '+state.get('user_profile.user.token'),
    },
  }).then((res) => {
    //Now get names of users from their ids
    let meta = res.data
    // Get each permissioned user (we need their names)
    state.set('sharing_dialog.shared_users', {});
    if (!meta._permissions) return;
    return Promise.map(Object.keys(meta._permissions), (user) => {
      return axios({
        method:'GET',
        url: config.oadaDomain+'/'+user,
        headers: {
          'Authorization': 'Bearer '+state.get('user_profile.user.token'),
        }
      }).then((res) => {
        state.set('sharing_dialog.shared_users.'+user, res.data);
      });
    });
  }).then(() => {
    return
  }).catch((error) => {
    return
  });
}
