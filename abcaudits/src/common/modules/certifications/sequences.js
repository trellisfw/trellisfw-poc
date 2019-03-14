import randCert from '@trellisfw/random-certs';
import uuid from 'uuid';
import oada from '@oada/cerebral-module/sequences';
import { sequence } from 'cerebral';
import { unset, set } from 'cerebral/operators';
import {state, props } from 'cerebral/tags';
import templateAudit from './GlobalGAP_FullAudit.js';
import _ from 'lodash';
import Promise from 'bluebird';
import signatures from '@trellisfw/signatures';
import prvKey from '../../../prvKey.js';
import pubKey from '../../../pubKey.js';
Promise.config({warnings: false})

var tree = {
  bookmarks: {
    _type: 'application/vnd.oada.bookmarks.1+json',
    _rev: '0-0',
    trellisfw: {
      _type: 'application/vnd.trellisfw.1+json',
      _rev: '0-0',
      certifications: {
        _type: 'application/vnd.trellisfw.certifications.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellisfw.certification.globalgap.1+json',
          _rev: '0-0',
          audit: {
            _type: 'application/vnd.trellisfw.audit.globalgap.1+json',
            _rev: '0-0',
          },
          certificate: {
            _type: 'application/vnd.trellisfw.certificate.1+json',
            _rev: '0-0',
          }
        }
      }
    }
  }
}



export const mapTrellisToRecords = sequence('certifications.mapTrellisToRecords', [
  ({state, props}) => {
    var connection_id = state.get('certifications.connection_id');
    var certs = state.get(`oada.${connection_id}.bookmarks.trellisfw.certifications`);
    state.set(`certifications.records`, {});
    Object.keys(certs || {}).map((certId) =>
      state.set(`certifications.records.${certId}`, certs[certId])
    )
  },
])

export const fetch = sequence('certifications.fetch', [
  ({props, state}) => {
    var signals = (props.signals ? props.signals : []);
    var watch = {signals: [...signals, 'certifications.mapTrellisToRecords']};
    return {
      requests: [
        {
          path: '/bookmarks/trellisfw/certifications',
          tree,
          connection_id: state.get('certifications.connection_id'),
          watch,
        }
      ],
    }
  },
  oada.get,
  mapTrellisToRecords
])

export const initialize = sequence('certifications.initialize', [
  oada.connect,
  set(state`certifications.connection_id`, props`connection_id`),
  fetch
])

export const createCertification = sequence('certifications.createCertification', [
  //optimistic update
  set(state`certifications.records.${props`certId`}.audit`, props`audit`),
  set(props`connection_id`, state`certifications.connection_id`),
  ({state, props}) => ({
    requests: [
      {
        connection_id: state.get(`certifications.connection_id`),
        path: `/bookmarks/trellisfw/certifications/${props.certId}`,
        data: {_id: 'resources/'+props.certId},
        tree
      },
    ],
  }),
  oada.put,
  ({state, props}) => ({
    connection_id: state.get(`certifications.connection_id`),
    path: `/bookmarks/trellisfw/certifications/${props.certId}/audit`,
    data: props.audit,
    tree
  }),
  oada.put,
])

export const deleteCertifications = sequence('certifications.deleteCertifications', [
  ({state, props}) => {
    return Promise.map(Object.keys(props.certifications), (key) => {
      // Optimistic update
      state.unset(`certifications.records.${key}`);
      return {
        path: `/bookmarks/trellisfw/certifications/${key}`,
        type: `application/vnd.trellisfw.certification.globalgap.1+json`,
      }
    }).then((requests) => {
      return {requests}
    })
  },
  oada.delete,
])

export const closeViewerClicked = sequence('certifications.closeViewerClicked', [
	unset(state`view.certifications.${props`certId`}.cert_viewer`)
])

export const certViewerClicked = sequence('certifications.certViewerClicked', [
	showDoc,
])

function showDoc({state, props}) {
	state.set(`view.certifications.${props.certId}.cert_viewer`, {
		doc: props.doc,
		expanded: ''
	})
}

export function generateAuditSignature({state, props}) {
  var kid = 'ABCAudits'
  var alg = 'RS256'
  var kty = 'RSA'
  var typ = 'JWT'
  var jku = 'https://raw.githubusercontent.com/trellisfw/trellisfw-trusted-list/master/jku-test/jku-test.json'
  var headers = { kid, alg, kty, typ, jwk:pubKey, jku }
  var audit = _.clone(props.audit)
  delete audit._id
  delete audit._rev
  delete audit._meta
  return signatures.generate(audit, prvKey, headers).then((signature) => {
    //optimistic update
    state.set(`certifications.records.${props.certId}.audit.signatures`, signature);
	  return {signature, audit}
  })
}

export function updateCerts({state, props}) {
  var certifications = {};
	return Promise.map(Object.keys(props.certifications), (key) => {
		let audit = randCert.generateAudit({
			template: templateAudit,
			minimizeAuditData: true,
			organization: {name: props.clientName},
			year: (parseInt(props.certifications[key].audit.conditions_during_audit.operation_observed_date.slice(0,4), 10)+1).toString(),
			scope: {
				products_observed: props.certifications[key].audit.scope.products_observed,
				operations: props.certifications[key].audit.scope.operations
			}
    })
    certifications[key] = {audit};
    // Optimistic update
    state.set(`certifications.records.${key}.audit`, audit);
    return;
	}).then(() => {
		return {certifications}
	})
}

export function generateRandomCertification({state, props}) {
	let audit = randCert.generateAudit({
		template: templateAudit,
		minimizeAuditData: true,
		organization: {name: props.clientName},
  })
  var certId = uuid();
  return {audit, certId, certification:{audit}};
}
