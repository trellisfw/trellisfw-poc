import randCert from 'fpad-rand-cert'
import { set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';
import Promise from 'bluebird';
import axios from 'axios';
let agent = require('superagent-promise')(require('superagent'), Promise);

export let setClient = [
  set(state`app.view.certifications`, {}),
  set(state`client_panel.selected_client`, props`id`),
  getCertifications, {
    success: [
      set(state`client_panel.clients.${props`id`}.certifications`, props`certifications`),
      setVisibleCertifications,
    ],
    error: [],
  },
]

export let submitClient = [
  toggle(state`client_panel.client_dialog.open`),
  putClient, {
    success: [
      set(state`client_panel.clients.${props`id`}`, props`client`),
      set(state`client_panel.client_dialog.text`, ''),
      setClient,
    ],
    error: [],
	},
]

export let cancelClient = [
  set(state`client_panel.client_dialog.text`, ''),
  toggle(state`client_panel.client_dialog.open`),
]

export let showClientDialog = [
  toggle(state`client_panel.client_dialog.open`),
]

export let setClientText = [
  set(state`client_panel.client_dialog.text`, props`text`),
]

export let init = [
  getClients, {
    success: [
      set(state`client_panel.clients`, props`clients`),
    ],
    error: [],
  },
]



function setVisibleCertifications({state, props, path}) {
  let clientId = state.get(`client_panel.selected_client`)
  let audits = state.get(`client_panel.clients.${clientId}.certifications`)
  let certs = {}
  Object.keys(audits).forEach((key) => {
    certs[key] = {selected: false}
  })
  state.set(`app.view.certifications`, certs)
}

function getCertifications({state, props, path}) {
	let clientId = state.get(`client_panel.selected_client`)
	console.log(clientId)
  let certs = state.get(`client_panel.clients.${clientId}.certifications`)
	console.log(certs)
  let certifications = {}
  return Promise.map(Object.keys(certs), (key) => {
    if (key.charAt(0) === '_') return false
    return agent('GET', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+clientId+'/certifications/'+key)
    .set('Authorization', 'Bearer '+ 'xyz')
    .end()
    .then((res) => {
      certifications[key] = res.body
      return res.body
    })
  }, {concurrency:5}).then(() => {
    return path.success({certifications})
  })
}

function putClient({state, props, path}) {
  let text = state.get('client_panel.client_dialog.text')
  let stuff = {name: text, certifications: {} }
  return agent('POST', 'https://api.oada-dev.com/resources')
  .set('Authorization', 'Bearer xyz')
  .set('Content-Type', 'application/vnd.oada.rock.1+json')
  .send(stuff)
  .end()
	.then((response) => {
    let id = response.headers.location.split('/')[2]
    // Link to bookmarks
    return agent('PUT', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+id)
    .set('Authorization', 'Bearer xyz')
    .set('Content-Type', 'application/vnd.oada.rock.1+json')
    .send({"_id": 'resources/'+id})
    .end()
			.then(() => {
				//GET it to confirm
	    return agent('GET', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+id)
		  .set('Authorization', 'Bearer xyz')
			.set('Content-Type', 'application/vnd.oada.rock.1+json')
			.end()
			.then((res) => {
				return path.success({id, client: res.body})
			})
    })
  })
}

function getClients({state, props, path}) {
  return agent('GET', 'https://api.oada-dev.com/bookmarks/fpad/clients')
  .set('Authorization', 'Bearer xyz')
  .then((response) => {
    let clients = {}
    return Promise.map(Object.keys(response.body), (key) => {
      if (key.charAt(0) === '_') return false
      return agent('GET', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+key)
      .set('Authorization', 'Bearer '+ 'xyz')
      .end()
      .then((res) => {
        clients[key] = res.body
        return res.body;
      })
    }, {concurrency:5}).then(() => {
      return path.success({clients})
    })
  })
}
