import { set, unset, when, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import _ from 'lodash'
import Promise from 'bluebird'
import axios from 'axios'

export let setClient = [
  set(state`App.model.certifications`, {}),
  set(state`App.view.certifications`, {}),
  set(state`ClientPanel.selected_client`, props`id`),
  set(props`token`, state`UserProfile.user.token`),
  getCertifications, {
    success: [
      set(state`App.model.certifications`, props`certifications`),
      setVisibleCertifications,
    ],
    error: [
    ],
  },
]

export let submitClient = [
  toggle(state`ClientPanel.client_dialog.open`),
  set(props`token`, state`UserProfile.user.token`),
  putClient, {
    success: [
      set(state`ClientPanel.clients.${props`id`}`, props`client`),
      set(state`ClientPanel.client_dialog.text`, ''),
      setClient,
    ],
    error: [
      set(state`ClientPanel.no_clients_error`, 'User does not have certifications')
    ],
  },
]

export let cancelClient = [
  set(state`ClientPanel.client_dialog.text`, ''),
  toggle(state`ClientPanel.client_dialog.open`),
]

export let showClientDialog = [
  toggle(state`ClientPanel.client_dialog.open`),
]

export let setClientText = [
  set(state`ClientPanel.client_dialog.text`, props`text`),
]

export let init = [
  when(state`UserProfile.user`), {
    true: [
    set(props`token`, state`UserProfile.user.token`),
      getClients, {
        success: [
          unset(state`ClientPanel.no_clients_error`),
          set(state`ClientPanel.clients`, props`clients`),
        ],
        error: [
          set(state`ClientPanel.no_clients_error`, 'User does not have clients')
        ],
      },
    ],
    false: [],
  }
]

function setVisibleCertifications({state, props, path}) {
  let clientId = state.get(`ClientPanel.selected_client`)
  let audits = state.get(`ClientPanel.clients.${clientId}.certifications`)
  let certs = {}
  Object.keys(audits).forEach((key) => {
    certs[key] = {selected: false}
  })
  state.set(`App.view.certifications`, certs)
}

function getCertifications({state, props, path}) {
  let domain = state.get('App.oada_domain')
  let clientId = state.get(`ClientPanel.selected_client`)
  let certs = state.get(`ClientPanel.clients.${clientId}.certifications`)
	let certifications = _.cloneDeep(certs)
  return Promise.map(Object.keys(certs), (key) => {
		if (key.charAt(0) === '_') return false
		let resId = certs[key]._id.replace(/^\/?resources\//, '')
    return axios({
      method: 'get', 
      url: domain+'/bookmarks/trellisfw/clients/'+clientId+'/certifications/'+resId,
      headers: {
        Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
      }
		}).then((res) => {
//Loop through and GET the audit, corrective actions, and certificates
      certifications[key] = {}
      return Promise.map(Object.keys(res.data), (doc) => {
        if (doc.charAt(0) === '_') return false
        return axios({
          method: 'get', 
          url: domain+'/bookmarks/trellisfw/clients/'+clientId+'/certifications/'+key+'/'+doc,
          headers: {
            Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
          }
        }).then((response) => {
          return certifications[key][doc] = response.data
        })
      })
    })
  }, {concurrency:5}).then(() => {
    return path.success({certifications})
  })
}

function putClient({state, props, path}) {
  let domain = state.get('App.oada_domain');
  let token = state.get('UserProfile.user.token');
  let text = state.get('ClientPanel.client_dialog.text')
  // POST certifications resource
  return axios({
    method: 'POST',
    url: domain+'/resources',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/vnd.trellisfw.certifications.1+json',
    },
    data: {
      _type: 'application/vnd.trellisfw.certifications.1+json',
      // TODO: do context right...
      _context: {client: text}
    }
  }).then((response) => {
    return axios({
      method: 'POST',
      url: domain+'/resources',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/vnd.trellisfw.client.1+json',
      },
      data: {
        _type: 'application/vnd.trellisfw.client.1+json',
        name: text,
        certifications: {
          _id: response.headers.location.replace(/^\//, ''),
          _rev: '0-0',
        }
      }
    }).then((res) => {
      let id = res.headers.location.replace(/^\/resources\//, '')
      // Link to bookmarks
      return axios({
        method: 'PUT', 
        url: domain+'/bookmarks/trellisfw/clients/'+id,
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/vnd.trellisfw.client.1+json',
        },
        data: {
          _id: 'resources/'+id, 
          _rev: '0-0'
        }
      }).then(() => {
        //GET it to confirm
        return getClient(id, domain, token).then((client) => {
          return path.success({id, client})
        })
      })
    })
  })
}

function getClient(clientId, domain, token) {
  let data = {}
  return axios({
    method: 'GET', 
    url: domain+'/bookmarks/trellisfw/clients/'+clientId,
    headers: {
      'Authorization': 'Bearer '+ token,
    }
  }).then((res) => {
    data = res.data
    //Get certifications list
    return axios({
      method: 'GET', 
      url: domain+'/bookmarks/trellisfw/clients/'+clientId+'/certifications',
      headers: {
        'Authorization': 'Bearer '+ token,
      }
    }).then((result) => {
      data.certifications = result.data
      // Get _meta document on certifications
      return axios({
        method:'GET', 
        url: domain+'/bookmarks/trellisfw/clients/'+clientId+'/certifications/_meta',
        headers: {
          'Authorization': 'Bearer '+ token,
        }
      }).then((r) => {
        data.certifications._meta = r.data
        // Get each permissioned user (we need their names)
        if (!r.data._permissions) return data
        return Promise.map(Object.keys(r.data._permissions), (user) => {
          return axios({
            method:'GET', 
            url: domain+'/'+user,
              headers: {
              'Authorization': 'Bearer '+ token,
            }
          }).then((resp) => {
            data.certifications._meta._permissions[user] = resp.data
          })
        }).then(() => {
          return data
        })
      })
    })
  })
}

function getClients({state, props, path}) {
  let domain = state.get('App.oada_domain');
  let token = state.get('UserProfile.user.token');
  let clients = {}
  // Get clients list
  return axios({
    method: 'GET', 
    url: domain+'/bookmarks/trellisfw/clients',
    headers: {
      'Authorization': 'Bearer '+ token,
    }
  }).then((response) => {
    // Get each client
    return Promise.map(Object.keys(response.data), (key) => {
      if (key.charAt(0) === '_') return
      return getClient(key, domain, token).then((res) => {
        clients[key] = res;
        return 
      })
    }, {concurrency:5})
  }).then(() => {
    return path.success({clients})
  }).catch(() => {
    return path.error({})
  })
}
