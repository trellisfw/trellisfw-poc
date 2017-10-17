import { unset, set, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import axios from 'axios';
import md5 from 'md5';
import {oadaDomain, sharePassword} from '../../config';

export let doneSharing = [
  set(state`SharingDialog.trellis_domain_text`, ''),
  set(state`SharingDialog.username_text`, ''),
	toggle(state`SharingDialog.open`),
	unset(state`SharingDialog.add_user_error`),
]

export let showSharingDialog = [
  toggle(state`SharingDialog.open`),
]

export let setUsernameText = [
  set(state`SharingDialog.username_text`, props`text`),
]

export let setUrlText = [
  set(state`SharingDialog.trellis_domain_text`, props`text`),
]

export let addUser = [
	//try to get current user
	createClientUser, {
		success: [
		  addPermissions, {
				success: [
					set(state`SharingDialog.shared_users.${props`user._id`}`, props`user`),
				  set(state`SharingDialog.trellis_domain_text`, ''),
					set(state`SharingDialog.username_text`, ''),
	      ],
				error: [
					set(state`SharingDialog.add_user_error`, 'Unable to share with this user')
				],
			},
		],
		error: [
			set(state`SharingDialog.add_user_error`, 'User not found with matching username and trellis domain')
		],
	}
]

function createClientUser({state, props, path}) {
	let oidc = {
		username: state.get(`SharingDialog.username_text`),
		iss: state.get(`SharingDialog.trellis_domain_text`)
	}
  let data = {
    username: md5(JSON.stringify(oidc)),
    oidc
  };
  if (sharePassword) data.password = sharePassword;
  console.log('data', data);
	return axios({
		method: 'post',
		url: oadaDomain+'/users',
		headers: {
			'Content-Type': 'application/vnd.oada.user.1+json',
			'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
		},
		data
  }).then((response) => {
		return axios({
			method: 'get',
			url: oadaDomain+response.headers.location,
			headers: {
				'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
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
  return axios({
    method: 'put',
    url: oadaDomain+'/bookmarks/fpad/certifications/_meta/_permissions',
    headers: {
      'Content-Type': 'application/vnd.fpad.certifications.1+json',
      'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
    },
    data: {
      [props.user._id]: {
        read: true,
        write: true,
        owner: false
      }
    }
	}).then((response) => {
    if (response.status >= 200 && response.status < 300) return path.success({});
    return path.error({response});
  }).catch((error) => {
    return path.error({error});
  })
}
