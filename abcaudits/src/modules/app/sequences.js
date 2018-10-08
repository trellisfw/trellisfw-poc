import randCert from '@trellisfw/random-certs'
import { sequence } from 'cerebral';
import { unset, set, } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import templateAudit from './GlobalGAP_FullAudit.js'
import _ from 'lodash'
import Promise from 'bluebird';
import signatures from '@trellisfw/signatures'
import prvKey from '../../prvKey.js'
import pubKey from '../../pubKey.js'
var agent = require('superagent-promise')(require('superagent'), Promise);

export const closeViewerClicked = sequence('closeViewerClicked', [
	unset(state`view.certifications.${props`name`}.cert_viewer`)
])

export const certViewerClicked = sequence('certViewerClicked', [
	showDoc,
	//set(state`view.certifications.${props`name`}`, {cert_viewer: {doc: props`doc_type`, expanded: ''}})
])

function showDoc({state, props}) {
	state.set(`view.certifications.${props.name}.cert_viewer`, {
		doc: props.doc, 
		expanded: ''
	})
}

export const certChecked = sequence('certChecked', [
  set(state`view.certifications.${props`name`}.selected`, props`checked`)
])

export const initialize = sequence('initialize', [

])

export const signAudit = [
  generateAuditSignature,
  set(state`client_panel.clients.${state`client_panel.selected_client`}.certifications.${(props`name`)}.audit.signatures`, props`signatures`),
]

export const addCertButtonClicked = sequence('addCertButtonClicked', [
  addRandomCert,
  set(state`client_panel.clients.${props`clientId`}.certifications.${props`certid`}.audit`, props`audit`),
  set(state`view.certifications.${props`certid`}`, {selected: false}),
])

export const deleteCertsButtonClicked = sequence('deleteCertsButtonClicked', [
  deleteSelectedCertifications,
	unsetCerts,
])

export const updateCertButtonClicked = sequence('updateCertButtonClicked', [
	updateCerts,
	setCertifications,
])

function setCertifications({state, props}) {
  let clientId = state.get('client_panel.selected_client')
	Object.keys(props.newAudits).forEach(key => {
		state.set(`client_panel.clients.${clientId}.certifications.${key}`, {audit: props.newAudits[key]});
		state.set(`view.certifications.${key}`, {selected: false});
	})
}

function generateAuditSignature({state, props}) {
  let domain = state.get('oada_domain')
  var kid = 'ABCAudits'
  var alg = 'RS256'
  var kty = 'RSA'
  var typ = 'JWT'
  var jku = 'https://raw.githubusercontent.com/trellisfw/trellisfw-trusted-list/master/jku-test/jku-test.json' 
  var headers = { kid, alg, kty, typ, jwk:pubKey, jku }
  let clientId = state.get('client_panel.selected_client')
  let audit = _.clone(props.audit)
  return signatures.generate(audit, prvKey, headers).then((signatures) => {
		return agent('PUT', domain+'/bookmarks/trellis/clients/'+clientId+'/certifications/'+props.name+'/audit/signatures')
    .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
    .set('Content-Type', 'application/vnd.oada.certifications.globalgap.1+json')
    .send(signatures)
    .end()
    .then((res) => {
      return {signatures}
    })
  })
}

function deleteSelectedCertifications({state, props}) {
  let domain = state.get('oada_domain')
	let id = state.get('client_panel.selected_client')
	let selectedCerts = []
	let certs = state.get(`view.certifications`)
	Object.keys(certs).forEach((key) => {
		if (certs[key].selected) selectedCerts.push(key)
	})
  return Promise.map(selectedCerts, (key) => {
    return agent('DELETE', domain+'/bookmarks/trellis/clients/'+id+'/certifications/'+key)
    .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
    .end()
  }).then(() => {
		return {deletedCerts:selectedCerts}
	})
}

function unsetCerts({state, props}) {
	let clientId = state.get('client_panel.selected_client')
	props.deletedCerts.forEach(key => {
		state.unset(`client_panel.clients.${clientId}.certifications.${key}`)
		state.unset(`view.certifications.${key}`)
	})
}

function updateCerts({state, props}) {
	let domain = state.get('oada_domain')
  let a = state.get('view.certifications')
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
		.set('Content-Type', 'application/vnd.trellis.audit.globalgap.1+json')
		.send(audit)
		.end()
		.then((response) => {
			let id = response.headers.location.split('/')
			id = id[id.length-1]
			audit._id = 'resources/'+id
			return agent('POST', domain+'/resources')
			.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
			.set('Content-Type', 'application/vnd.trellis.certification.globalgap.1+json')
			.send({audit: { _id: id, _rev: '0-0'}})
			.end()
			.then((res) => {
				let certid = response.headers.location.split('/')
				certid = certid[certid.length-1]
				newAudits[certid] = audit
				return agent('PUT', domain+'/bookmarks/trellis/clients/'+clientId+'/certifications/'+certid)
				.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
				.set('Content-Type', 'application/vnd.trellis.certification.globalgap.1+json')
				.send({_id:'resources/'+certid, _rev: '0-0'})
				.end()
			})
		})
	}).then(() => {
		return {newAudits, clientId}
	})
}

function addRandomCert({state, props}) {
  let domain = state.get('oada_domain')
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
  .set('Content-Type', 'application/vnd.trellis.audit.globalgap.1+json')
  .send(audit)
  .end()
	.then((response) => {
		auditid = response.headers.location.split('/')
		auditid = auditid[auditid.length-1]
		audit._id = 'resources/'+auditid
		return agent('POST', domain+'/resources')
		.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
		.set('Content-Type', 'application/vnd.trellis.certification.globalgap.1+json')
		.send({audit: {_id:'resources/'+auditid, _rev: '0-0'}})
		.end()
		.then((response) => {
			certid = response.headers.location.split('/')
			certid = certid[certid.length-1]
			return agent('PUT', domain+'/bookmarks/trellis/clients/'+clientId+'/certifications/'+certid)
			.set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
			.set('Content-Type', 'application/vnd.trellis.certifications.globalgap.1+json')
			.send({_id:'resources/'+certid, _rev: '0-0'})
			.end()
		}).then(() => {
			return {certid, audit, clientId}
		})
  })
}
