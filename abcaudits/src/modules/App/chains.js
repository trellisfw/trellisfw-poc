import randCert from 'fpad-rand-cert'
import { unset, set, } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import templateAudit from './GlobalGAP_FullAudit.js'
import _ from 'lodash'
import Promise from 'bluebird';
import signatures from 'fpad-signatures'
import prvKey from '../../prvKey.js'
import pubKey from '../../pubKey.js'
import {setClient} from '../ClientPanel/chains.js'
var agent = require('superagent-promise')(require('superagent'), Promise);

export let closeViewer = [
	unset(state`app.view.certifications.${props`name`}.cert_viewer`)
]

export let showViewer = [
	set(state`app.view.certifications.${props`name`}.cert_viewer`, {doc: props`doc`, expanded: ''})
]

export let toggleCertSelect = [
  set(state`app.view.certifications.${props`name`}.selected`, props`checked`)
]

export let initialize = [

]

export let signAudit = [
  generateAuditSignature, {
    success: [
      set(state`client_panel.clients.${state`client_panel.selected_client`}.certifications.${(props`id`)}.audit.signatures`, props`signatures`),
    ],
    error: [],
  },
]

export let addCertification = [
  addRandomCert, {
    success: [
      set(state`client_panel.clients.${props`clientId`}.certifications.${props`id`}.audit`, props`audit`),
      set(state`app.view.certifications.${props`id`}`, {selected: false}),
    ],
    error: [],
  },
] 

export let deleteAudits = [
  deleteSelectedAudits, {
    success: [
      setClient, //use this to reset visible certifications
    ],
    error: [],
  }
]

export let updateCertifications = [
	updateCerts, {
		success: [
			setCertifications,
		],
		error: [],
	}
]

function setCertifications({state, props, path}) {
  let clientId = state.get('client_panel.selected_client')
	Object.keys(props.newAudits).forEach(key => {
		state.set(`client_panel.clients.${clientId}.certifications.${key}`, {audit: props.newAudits[key]});
		state.set(`app.view.certifications.${key}`, {selected: false});
	})
}

function generateAuditSignature({state, props, path}) {
  let domain = state.get('app.oada_domain')
  var kid = 'ABCAudits'
  var alg = 'RS256'
  var kty = 'RSA'
  var typ = 'JWT'
  var jku = 'https://raw.githubusercontent.com/fpad/trusted-list/master/jku-test/jku-test.json' 
  var headers = { kid, alg, kty, typ, jwk:pubKey, jku }
  let clientId = state.get('client_panel.selected_client')
  let audit = _.clone(props.audit)
  return signatures.generate(audit, prvKey, headers).then((signatures) => {
    return agent('PUT', domain+'/bookmarks/fpad/clients/'+clientId+'/certifications/audit'+props.audit._id.split('/')[1]+'/signatures')
    .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
    .set('Content-Type', 'application/vnd.oada.certifications.globalgap.1+json')
    .send(signatures)
    .end()
    .then((res) => {
      return path.success({signatures, id: audit._id.split('/')[1]})
    })
  })
}

function deleteSelectedAudits({state, props, path}) {
  let domain = state.get('app.oada_domain')
  let clientId = state.get('client_panel.selected_client')
  let selectedCertifications = _.selectBy(state.get(`app.view.certifications`), 'selected')
  return Promise.map(selectedCertifications, (key) => {
    return agent('DELETE', domain+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+key)
    .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
    .end()
    .then(() => {
      return agent('PUT', domain+'/resources/'+key)
      .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
      .end()
    })
  }).then(() => {
    return path.success({selectedCertifications})
  })
}

function updateCerts({state, props, path}) {
	let domain = state.get('app.oada_domain')
  let a = state.get('app.view.certifications')
  let clientId = state.get(`client_panel.selected_client`)
	let clientName = state.get(`client_panel.clients.${clientId}.name`)
	let certifications = state.get(`client_panel.clients.${clientId}.certifications`);
	let newAudits = {};
	return Promise.map(Object.keys(certifications), (key) => {
		if (!a[key].selected) return
		let audit = randCert.generateAudit({
			template: templateAudit, 
			minimizeAuditData: true,
			organization: {name: clientName},
			year: (parseInt(certifications[key].audit.conditions_during_audit.operation_observed_date.slice(0,4), 10)+1).toString(),
			scope: {
				products_observed: certifications[key].audit.scope.products_observed,
				operations: certifications[key].audit.scope.operations
			}
		})
		return agent('POST', domain+'/resources')
		.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
		.set('Content-Type', 'application/vnd.fpad.certifications.globalgap.1+json')
		.send(audit)
		.end()
		.then((response) => {
			let id = response.headers.location.split('/')
			id = id[id.length-1]
			audit._id = 'resources/'+id
			newAudits[id] = audit
			return agent('PUT', domain+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+id)
			.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
			.set('Content-Type', 'application/vnd.fpad.certifications.globalgap.1+json')
			.send({_id:'resources/'+id, _rev: '0-0'})
			.end()
		})
	}).then(() => {
		return path.success({newAudits, clientId})
	})
}

function addRandomCert({state, props, path}) {
  let domain = state.get('app.oada_domain')
  let clientId = state.get(`client_panel.selected_client`)
  let clientName = state.get(`client_panel.clients.${clientId}.name`)
	let audit = randCert.generateAudit({
		template: templateAudit, 
		minimizeAuditData: true,
		organization: {name: clientName},
	})
	let auditid;
	let certid;
  return agent('POST', domain+'/resources')
  .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
  .set('Content-Type', 'application/vnd.fpad.certifications.globalgap.1+json')
  .send(audit)
  .end()
	.then((response) => {
		auditid = response.headers.location.split('/')
		auditid = auditid[auditid.length-1]
		audit._id = 'resources/'+auditid
		return agent('POST', domain+'/resources')
		.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
		.set('Content-Type', 'application/vnd.fpad.certifications.globalgap.1+json')
		.send({audit: {_id:'resources/'+auditid, _rev: '0-0'}})
		.end()
		.then((response) => {
			certid = response.headers.location.split('/')
			certid = certid[certid.length-1]
			return agent('PUT', domain+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+certid)
			.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
			.set('Content-Type', 'application/vnd.fpad.certifications.globalgap.1+json')
			.send({_id:'resources/'+certid, _rev: '0-0'})
			.end()
		}).then(() => {
			return path.success({certid, audit, clientId})
		})
  })
}
