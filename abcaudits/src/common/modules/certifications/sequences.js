import randCert from '@trellisfw/random-certs';
import uuid from 'uuid';
import * as oada from '@oada/cerebral-module/sequences';
import { sequence } from 'cerebral';
import { set } from 'cerebral/operators';
import {state, props } from 'cerebral/tags';
import templateAudit from './GlobalGAP_FullAudit.js';
import _ from 'lodash';
import Promise from 'bluebird';
import signatures from '@trellisfw/signatures';
import prvKey from '../../../prvKey.js';
import pubKey from '../../../pubKey.js';

var tree = {
  bookmarks: {
    _type: 'application/vnd.oada.bookmarks.1+json',
    _rev: '0-0',
    trellis: {
      _type: 'application/vnd.trellis.1+json',
      _rev: '0-0',
      certifications: {
        _type: 'application/vnd.trellis.certifications.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellis.certification.globalgap.1+json',
          _rev: '0-0',
          audit: {
            _type: 'application/vnd.trellis.audit.globalgap.1+json',
            _rev: '0-0',
          },
          certificate: {
            _type: 'application/vnd.trellis.certificate.1+json',
            _rev: '0-0',
          }
        }
      }
    }
  }
}

export const certChecked = sequence('certifications.certChecked', [
  set(state`certifications.${props`name`}.selected`, props`checked`)
])

export const fetch = sequence('certifications.fetch', [
  ({props, state}) => ({
    path: '/bookmarks/trellis/certifications',
    tree,
    connection_id: state.get('certifications.connection_id'),
    watch: {
      signals: ['certifications.mapTrellisToRecords']
    }
  }),
  oada.get,
])

export const mapTrellisToRecords = sequence('certifications.mapTrellisToRecords', [
  ({state, props}) => {
    var connection_id = state.get('certifications.connection_id');
    var certs = state.get(`oada.${connection_id}.bookmarks.trellis.certifications`);
    return Promise.map(Object.keys(certs || {}), (certId) => {
      state.set(`certifications.${certId}`, certs[certId]);
    })
  },
])

export const initialize = sequence('certifications.initialize', [
  oada.connect,
  set(state`certifications.connection_id`, props`connection_id`),
  fetch
])

export const signAuditButtonClicked = sequence('certifications.signAuditButtonClicked', [
  generateAuditSignature,
  ({state, props}) => ({
    connection_id: state.get(`certifications.connection_id`),
    path: `/bookmarks/trellis/clients/${props.clientId}/certifications/${props.name}/audit/signatures`,
    data: props.signature,
    tree,
    type: 'application/vnd.trellis.audit.globalgap.1+json',
  }),
  oada.put,
  set(state`client_panel.clients.${state`client_panel.selected_client`}.certifications.${(props`name`)}.audit.signatures`, props`signature`),
])

export const addCertButtonClicked = sequence('certifications.addCertButtonClicked', [
  addRandomCert,
  ({state, props}) => ({
    connection_id: state.get(`certifications.connection_id`),
    path: `/bookmarks/trellis/clients/${props.clientId}/certifications/${props.certId}/audit`,
    data: props.audit,
  }),
  oada.put,
  set(state`client_panel.clients.${props`clientId`}.certifications.${props`certId`}.audit`, props`audit`),
  set(state`certifications.${props`certId`}`, {selected: false}),
])

export const deleteCertsButtonClicked = sequence('certifications.deleteCertsButtonClicked', [
  deleteSelectedCertifications,
  ({state, props}) => {
    return Promise.map(props.certifications, (cert) => {
      return {
        path: `/bookmarks/trellis/clients/${props.clientId}/certifications/${cert.id}`,
        tree
      }
    }).then((requests) => {
      return {requests}
    })
  },
  oada.delete,
	unsetCerts,
])

export const updateCertButtonClicked = sequence('certifications.updateCertButtonClicked', [
  updateCerts,
  set(props`clientId`, state`client_panel.selected_client`),
  set(props`connection_id`, state`certifications.connection_id`),
  ({state, props}) => {
    return Promise.map(Object.keys(props.audits || {}), (certId) => ({
      path: `/bookmarks/trellis/clients/${props.clientId}/certifications/${certId}/audit`,
      data: props.audit,
      tree,
    })).then((requests) => {
      return {requests};
    })
  },
  oada.put,
	setCertifications,
])

function setCertifications({state, props}) {
  let clientId = state.get('client_panel.selected_client')
	Object.keys(props.newAudits).forEach(key => {
		state.set(`client_panel.clients.${clientId}.certifications.${key}`, {audit: props.newAudits[key]});
		state.set(`certifications.${key}`, {selected: false});
	})
}

function generateAuditSignature({state, props}) {
  var kid = 'ABCAudits'
  var alg = 'RS256'
  var kty = 'RSA'
  var typ = 'JWT'
  var jku = 'https://raw.githubusercontent.com/trellisfw/trellisfw-trusted-list/master/jku-test/jku-test.json' 
  var headers = { kid, alg, kty, typ, jwk:pubKey, jku }
  let clientId = state.get('client_panel.selected_client')
  let audit = _.clone(props.audit)
  return signatures.generate(audit, prvKey, headers).then((signature) => {
	  return {signature, audit, clientId}
  })
}

function deleteSelectedCertifications({state, props}) {
	let clientId = state.get('client_panel.selected_client')
	let certifications = []
	let certs = state.get(`certifications`)
	Object.keys(certs).forEach((key) => {
		if (certs[key].selected) certifications.push(key)
  })
  return {certifications, clientId};
}

function unsetCerts({state, props}) {
	let clientId = state.get('client_panel.selected_client')
	props.deletedCerts.forEach(key => {
		state.unset(`client_panel.clients.${clientId}.certifications.${key}`)
		state.unset(`certifications.${key}`)
	})
}

function updateCerts({state, props}) {
  let a = state.get('certifications')
  let clientId = state.get(`client_panel.selected_client`)
	let clientName = state.get(`client_panel.clients.${clientId}.name`)
	let certifications = state.get(`client_panel.clients.${clientId}.certifications`);
	let audits = {};
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
    audits[uuid()] = audit;
    return;
	}).then(() => {
		return {audits, clientId}
	})
}

function addRandomCert({state, props}) {
  let clientId = state.get(`client_panel.selected_client`)
  let clientName = state.get(`client_panel.clients.${clientId}.name`)
	let audit = randCert.generateAudit({
		template: templateAudit, 
		minimizeAuditData: true,
		organization: {name: clientName},
  })
  return {audit, clientId, certId: uuid()};
}
