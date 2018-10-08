import { set, unset, when, toggle } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import { sequence } from 'cerebral'
import Promise from 'bluebird'
import axios from 'axios'

export const clientClicked = sequence('client_panel.clientClicked', [
  set(state`view.certifications`, {}),
  set(state`client_panel.selected_client`, props`id`),
  set(props`token`, state`user_profile.user.token`),
  getCertifications,
  setVisibleCertifications,
])

export const clientDialogSubmitted = sequence('client_panel.clientDialogSubmitted', [
	toggle(state`client_panel.client_dialog.open`),
	set(props`token`, state`user_profile.user.token`),
  putClient,
  clientClicked,
])

export const clientDialogCancelled = sequence('client_panel.clientDialogCancelled', [
  set(state`client_panel.client_dialog.text`, ''),
  toggle(state`client_panel.client_dialog.open`),
])

export const addClientButtonClicked = sequence('client_panel.addClientButtonClicked', [
  toggle(state`client_panel.client_dialog.open`),
])

export const textChanged = sequence('client_panel.textChanged', [
  set(state`client_panel.client_dialog.text`, props`text`),
])

export const initialize = sequence('client_panel.initialize', [
	when(state`user_profile.user`), {
		true: [
      set(props`token`, state`user_profile.user.token`),
      getClients,
    ],
		false: [],
	}
])

function setVisibleCertifications({state, props}) {
  let clientId = state.get(`client_panel.selected_client`)
  let audits = state.get(`client_panel.clients.${clientId}.certifications`)
  let certs = {}
  Object.keys(audits).forEach((key) => {
    certs[key] = {selected: false}
  })
  state.set(`view.certifications`, certs)
}

function getCertifications({state, props}) {
  let domain = state.get('oada_domain')
	let clientId = state.get(`client_panel.selected_client`)
  let certs = state.get(`client_panel.clients.${clientId}.certifications`)
  let certifications = {}
  return Promise.map(Object.keys(certs), (key) => {
    if (key.charAt(0) === '_') return false
		return axios({
			method: 'get', 
			url: domain+'/bookmarks/trellis/clients/'+clientId+'/certifications/'+key,
			headers: {
				Authorization: 'Bearer '+ state.get('user_profile.user.token'),
			}
		}).then((res) => {
			certifications[key] = {}
		  return Promise.map(Object.keys(res.data), (doc) => {
				if (doc.charAt(0) === '_') return false
				return axios({
					method: 'get', 
					url: domain+'/bookmarks/trellis/clients/'+clientId+'/certifications/'+key+'/'+doc,
					headers: {
						Authorization: 'Bearer '+ state.get('user_profile.user.token'),
					}
				}).then((response) => {
					return certifications[key][doc] = response.data
				})
			})
    })
  }, {concurrency:5}).then(() => {
    state.set(`client_panel.clients.${props.id}.certifications`, certifications)
    return {certifications}
  })
}

function putClient({state, props}) {
  let domain = state.get('oada_domain')
  let text = state.get('client_panel.client_dialog.text')
	// POST certifications resource
	return axios({
		method: 'POST',
		url: domain+'/resources',
		headers: {
			'Authorization': 'Bearer '+state.get('user_profile.user.token'),
			'Content-Type': 'application/vnd.trellis.certifications.globalgap.1+json',
		},
		data: {_type: 'application/vnd.trellis.certifications.globalgap.1+json'},
	}).then((response) => {
		return axios({
			method: 'POST',
			url: domain+'/resources',
			headers: {
				'Authorization': 'Bearer '+state.get('user_profile.user.token'),
				'Content-Type': 'application/vnd.trellis.client.1+json',
			},
			data: {
				_type: 'application/vnd.trellis.client.1+json',
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
				url: domain+'/bookmarks/trellis/clients/'+id,
				headers: {
					'Authorization': 'Bearer '+state.get('user_profile.user.token'),
					'Content-Type': 'application/vnd.trellis.client.1+json',
				},
				data: {
					_id: 'resources/'+id, 
					_rev: '0-0'
				}
			}).then(() => {
				//GET it to confirm
				return axios({
					method: 'GET', 
					url: domain+'/bookmarks/trellis/clients/'+id,
					headers: {
						'Authorization': 'Bearer '+state.get('user_profile.user.token'),
					}
        }).then((res) => {
          state.set(`client_panel.clients.${props.id}`, res.data)
          state.set(`client_panel.client_dialog.text`, '')
					return {id, client: res.data}
				})
			})
    })
  }).catch(() => {
    state.set(`client_panel.no_clients_error`, 'User does not have certifications')
    return
  })
}

function getClients({state, props}) {
  let domain = state.get('oada_domain')
  let clients = {}
	// Get clients list
	return axios({
		method: 'GET', 
		url: domain+'/bookmarks/trellis/clients',
		headers: {
			'Authorization': 'Bearer '+state.get('user_profile.user.token'),
		}
	}).then((response) => {
		// Get each client
		return Promise.map(Object.keys(response.data), (key) => {
			if (key.charAt(0) === '_') return
			return axios({
				method: 'GET', 
				url: domain+'/bookmarks/trellis/clients/'+key,
				headers: {
					'Authorization': 'Bearer '+ state.get('user_profile.user.token'),
				}
			}).then((res) => {
        clients[key] = res.data
				//Get certifications list
				return axios({
					method: 'GET', 
					url: domain+'/bookmarks/trellis/clients/'+key+'/certifications',
					headers: {
						'Authorization': 'Bearer '+ state.get('user_profile.user.token'),
					}
				}).then((result) => {
					clients[key].certifications = result.data
					// Get _meta document
					return axios({
						method:'GET', 
						url: domain+'/bookmarks/trellis/clients/'+key+'/_meta',
						headers: {
							'Authorization': 'Bearer '+ state.get('user_profile.user.token'),
						}
					}).then((r) => {
						clients[key]._meta = r.data
						// Get each permissioned user (we need their names)
						if (!r.data._permissions) return
						return Promise.map(Object.keys(r.data._permissions), (user) => {
							return axios({
								method:'GET', 
								url: domain+'/'+user,
								headers: {
									'Authorization': 'Bearer '+ state.get('user_profile.user.token'),
								}
							}).then((resp) => {
								clients[key]._meta._permissions[user] = resp.data
								return
							})
						})
					})
				})
			})
    }, {concurrency:5})
  }).then(() => {
    state.unset(`client_panel.no_clients_error`),
    state.set(`client_panel.clients`, clients)
    return {clients}
	}).catch(() => {
	  state.set(`client_panel.no_clients_error`, 'User does not have clients')
		return
	})
}
