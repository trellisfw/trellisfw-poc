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
				success: [],
				error: [],
			},
		],
		error: [],
	}
]

function createClientUser({state, props, path}) {
	return axios({
		method: 'post',
		url: 'https://api.oada-dev.com/users',
		headers: {
			'Content-Type': 'application/vnd.oada.rock.1+json',
			'Authorization': 'Bearer xyz',
		},
		data: {oadaid: state`client_panel.client_dialog.selected_client`},
	}).then((response) => {
		return path.success({})
	})
}

function addPermissions({state, props, path}) {

}
