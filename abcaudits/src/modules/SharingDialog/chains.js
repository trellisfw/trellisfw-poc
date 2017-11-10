import { unset, set, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import axios from 'axios';
import md5 from 'md5';
import {oadaDomain} from '../../config';
import getOadaBaseURI from '../OADA/factories/getOadaBaseURI'

export let doneSharing = [
  set(state`SharingDialog.trellis_domain_text`, ''),
  set(state`SharingDialog.username_text`, ''),
  toggle(state`SharingDialog.open`),
  unset(state`SharingDialog.add_user_error`),
]

export let showSharingDialog = [
  loadSharingMeta,
  {
    success: [],
    error: []
  },
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
  getOadaBaseURI({domain: state`SharingDialog.trellis_domain_text`}),
  {
    success: [
      createClientUser, {
				success: [
					//					set(state`ClientPanel.clients.${state`ClientPanel.selected_client`}._meta._permissions.${props`user._id`}`, props`user`),
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
    ],
    error: [
      set(state`SharingDialog.add_user_error`, 'The domain you entered is not a valid trellis domain.')
    ]
  }
]

function loadSharingMeta({state, props, path}) {
  return axios({
    method: 'get',
    url: oadaDomain+'/bookmarks/trellisfw/certifications/_meta',
    headers: {
      'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
    },
  }).then((res) => {
    //Now get names of users from their ids
    let meta = res.data
    // Get each permissioned user (we need their names)
    state.set('SharingDialog.shared_users', {});
    if (!meta._permissions) return;
    return Promise.map(Object.keys(meta._permissions), (user) => {
      return axios({
        method:'GET',
        url: oadaDomain+'/'+user,
        headers: {
          'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
        }
      }).then((res) => {
        state.set('SharingDialog.shared_users.'+user, res.data);
      });
    });
  }).then(() => {
    return path.success({});
  }).catch((error) => {
    return path.error({error});
  });
}

function createClientUser({state, props, path}) {
  let domain = state.get('App.oada_domain')
  let oidc = {
    username: state.get(`SharingDialog.username_text`),
    iss: state.get(`SharingDialog.trellis_domain_text`)
  }
  return axios({
    method: 'post',
    url: domain+'/users',
    headers: {
      'Content-Type': 'application/vnd.trellisfw.client.1+json',
      'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
    },
    data: {
      username: md5(JSON.stringify(oidc)),
      oidc
    },
  }).then((response) => {
    console.log(response)
    return axios({
      method: 'get',
      url: domain+response.headers.location,
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
  let domain = state.get('App.oada_domain')
  let clientId = state.get('ClientPanel.selected_client')
  return axios({
    method: 'put',
    url: domain+'/bookmarks/trellisfw/clients/'+clientId+'/certifications/_meta/_permissions',
    headers: {
      'Content-Type': 'application/vnd.trellisfw.certifications.1+json',
      'Authorization': 'Bearer '+state.get('UserProfile.user.token'),
    },
    data: {
      [props.user._id]: {
        read: true,
        write: true,
        owner: false
      }
    }
  }).then((res) => {
    console.log(clientId, res.body)
    return path.success({clientId})
  })
}
