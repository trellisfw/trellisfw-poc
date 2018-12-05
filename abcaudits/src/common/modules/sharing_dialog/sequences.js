import { unset, set, toggle } from 'cerebral/operators';
import Promise from 'bluebird';
import uuid from 'uuid';
import {state, props } from 'cerebral/tags';
import { sequence } from 'cerebral';
import axios from 'axios';
import oada from '@oada/cerebral-module/sequences';
import md5 from 'md5';
import config from '../../../config';

export const sharingDialogDoneClicked = sequence('sharing_dialog.sharingDialogDoneClicked', [
  set(state`sharing_dialog.trellis_domain_text`, ''),
  set(state`sharing_dialog.username_text`, ''),
	toggle(state`sharing_dialog.open`),
	unset(state`sharing_dialog.add_user_error`),
])

export const metaToSharedUsers = sequence('sharing_dialog.metaToSharedUsers', [
  // Get each permissioned user (we need their names)
  ({state, props}) => {
    var userIds = [];
    return Promise.map(Object.keys(props.responses[0].data || {}), (userId) => {
      userIds.push(userId);
      return {path: '/'+userId}
    }).then((requests) => {
      return {userIds, requests};
    })
  },
  oada.get,
  ({state, props}) => {
    state.set('sharing_dialog.shared_users', {});
    return Promise.map(props.responses, (item, i) => {
      state.set('sharing_dialog.shared_users.'+props.userIds[i], item.data);
      return
    }).then(() => {
      return
    })
  },
])

export const shareClientButtonClicked = sequence('sharing_dialog.shareClientButtonClicked', [
  toggle(state`sharing_dialog.open`),
  ({state, props}) => ({
    connection_id: props.connection_id,
    path: props.metaPath,
  }),
  oada.get,
  metaToSharedUsers,
])

export const usernameTextChanged = sequence('sharing_dialog.usernameTextChanged', [
  set(state`sharing_dialog.username_text`, props`text`),
])

export const urlTextChanged = sequence('sharing_dialog.urlTextChanged', [
  set(state`sharing_dialog.trellis_domain_text`, props`text`),
])

export const addUserButtonClicked = sequence('sharing_dialog.addUserButtonClicked', [
  // connection_id passed in by the common component
  set(props`token`, state`oada.connections.${props`connection_id`}.token`),
  createClientUser,
  ({state, props}) => ({
    type: 'application/vnd.trellis.client.1+json',
    path: props.path+'/'+props.user_id,
    data: {
      read: true,
      write: true, 
      owner: false
    }
  }),
  oada.put,
  ({state, props}) => ({
    path: '/'+props.user_id,
  }),
  oada.get,
  set(props`user`, props`responses.0.data`),
  set(state`sharing_dialog.trellis_domain_text`, ''),
	set(state`sharing_dialog.username_text`, ''),
	set(state`sharing_dialog.shared_users.${props`user_id`}`, props`user`),
  //set(state`sharing_dialog.add_user_error`, 'Unable to share with this user')
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
			'Content-Type': 'application/vnd.trellis.client.1+json',
			'Authorization': 'Bearer '+props.token,
		},
		data
  }).then((response) => {
    return {user_id: response.headers.location.slice(1)}
  })
}


