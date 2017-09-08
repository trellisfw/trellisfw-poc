import randCert from 'fpad-rand-cert'
import { set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';
import Promise from 'bluebird';
import axios from 'axios';
let agent = require('superagent-promise')(require('superagent'), Promise);
let domain = 'https://vip3.ecn.purdue.edu'

export let setClient = [
  set(state`app.view.certifications`, {}),
  set(state`client_panel.selected_client`, props`id`),
  set(props`token`, state`user_profile.user.token`),
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
	set(props`token`, state`user_profile.user.token`),
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
	when(state`user_profile.user`), {
		true: [
  	set(props`token`, state`user_profile.user.token`),
      getClients, {
        success: [
          set(state`client_panel.clients`, props`clients`),
        ],
        error: [],
			},
		],
		false: [],
	}
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
  let domain = state.get('app.oada_domain')
	let clientId = state.get(`client_panel.selected_client`)
  let certs = state.get(`client_panel.clients.${clientId}.certifications`)
  let certifications = {}
  return Promise.map(Object.keys(certs), (key) => {
    if (key.charAt(0) === '_') return false
    return agent('GET', 'https://'+domain+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+key)
    .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
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
  let domain = state.get('app.oada_domain')
  let text = state.get('client_panel.client_dialog.text')
  let stuff = {name: text, certifications: {} }
  return agent('POST', 'https://'+domain+'/resources')
  .set('Authorization', 'Bearer '+state.get('user_profile.user.token'))
  .set('Content-Type', 'application/vnd.oada.rock.1+json')
  .send(stuff)
  .end()
	.then((response) => {
    let id = response.headers.location.split('/')[2]
    // Link to bookmarks
    return agent('PUT', 'https://'+domain+'/bookmarks/fpad/clients/'+id)
    .set('Authorization', 'Bearer '+state.get('user_profile.user.token'))
    .set('Content-Type', 'application/vnd.oada.rock.1+json')
    .send({"_id": 'resources/'+id})
    .end()
			.then(() => {
				//GET it to confirm
	    return agent('GET', 'https://'+domain+'/bookmarks/fpad/clients/'+id)
		  .set('Authorization', 'Bearer '+state.get('user_profile.user.token'))
			.set('Content-Type', 'application/vnd.oada.rock.1+json')
			.end()
			.then((res) => {
				return path.success({id, client: res.body})
			})
    })
  })
}

function getClients({state, props, path}) {
  let domain = state.get('app.oada_domain')
  let clients = {}
  return agent('GET', 'https://'+domain+'/bookmarks/fpad/clients')
  .set('Authorization', 'Bearer '+state.get('user_profile.user.token'))
  .then((response) => {
    return Promise.map(Object.keys(response.body), (key) => {
      if (key.charAt(0) === '_') return
      return agent('GET', 'https://'+domain+'/bookmarks/fpad/clients/'+key)
      .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
      .end()
      .then((res) => {
        clients[key] = res.body
        return res.body;
      })
    }, {concurrency:5})
  }).then(() => {
    return path.success({clients})
  })
}
