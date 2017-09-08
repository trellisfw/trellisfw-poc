import randCert from 'fpad-rand-cert'
import { unset, set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import templateAudit from './GlobalGAP_FullAudit.js'
import _ from 'lodash'
import Promise from 'bluebird';
import uuid from 'uuid';
import oadaIdClient from 'oada-id-client'
import signatures from 'fpad-signatures'
import prvKey from '../../prvKey.js'
import pubKey from '../../pubKey.js'
import {setClient} from '../ClientPanel/chains.js'
var agent = require('superagent-promise')(require('superagent'), Promise);
//let url = 'https://api.oada-dev.com'
let url = 'https://vip3.ecn.purdue.edu'

export let toggleCertSelect = [
  set(state`app.view.certifications.${props`name`}.selected`, props`checked`)
]

export let initialize = [

]

export let signAudit = [
  generateAuditSignature, {
    success: [
      set(state`client_panel.clients.${state`client_panel.selected_client`}.certifications.${(props`id`)}.signatures`, props`signatures`),
    ],
    error: [],
  },
]

export let addCertification = [
  addRandomCert, {
    success: [
      set(state`client_panel.clients.${props`clientId`}.certifications.${props`id`}`, props`audit`),
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

function generateAuditSignature({state, props, path}) {
  var kid = 'ABCAudits'
  var alg = 'RS256'
  var kty = 'RSA'
  var typ = 'JWT'
  var jku = 'https://raw.githubusercontent.com/fpad/trusted-list/master/jku-test/jku-test.json' 
  var headers = { kid, alg, kty, typ, jwk:pubKey, jku }
  let clientId = state.get('client_panel.selected_client')
  let audit = _.clone(props.audit)
  return signatures.generate(audit, prvKey, headers).then((signatures) => {
    return agent('PUT', url+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+props.audit._id.split('/')[1]+'/signatures')
    .set('Authorization', 'Bearer '+ state.get('user_profile.user.token'))
    .set('Content-Type', 'application/vnd.oada.rock.1+json')
    .send(signatures)
    .end()
    .then((res) => {
      return path.success({signatures, id: audit._id.split('/')[1]})
    })
  })
}

function deleteSelectedAudits({state, props, path}) {
  let clientId = state.get('client_panel.selected_client')
  let selectedCertifications = _.selectBy(state.get(`app.view.certifications`), 'selected')
  let certifications = state.get(`client_panel.clients.${clientId}.certifications`)
  return Promise.map(selectedCertifications, (key) => {
    return agent('DELETE', url+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+key)
    .set('Authorization', 'Bearer '+ state`user_profile.token`)
    .end()
    .then(() => {
      return agent('PUT', url+'/resources/'+key)
      .set('Authorization', 'Bearer '+ state`user_profile.token`)
      .end()
    })
  }).then(() => {
    return path.success({selectedCertifications})
  })
}

function addRandomCert({state, props, path}) {
  let a = state.get('app.view.certifications')
  let clientId = state.get(`client_panel.selected_client`)
  let clientName = state.get(`client_panel.clients.${clientId}.name`)
  let org = randCert.randomOrganization(clientName);
  let auditor = randCert.randomAuditor()
  let product = randCert.randomProducts(1)[0]
  let operation = randCert.randomOperationTypes(1)
	let year = '2017'
	console.log(org, product, operation)
	let scope = randCert.randomScope(org, product, operation)
	console.log(scope)
  let audit = randCert.generateAudit(templateAudit, org, auditor, scope, year, true)
  let id;
  return agent('POST', url+'/resources')
  .set('Authorization', 'Bearer '+ 'xyz')
  .set('Content-Type', 'application/vnd.oada.rock.1+json')
  .send(audit)
  .end()
  .then((response) => {
    id = response.headers.location.split('/')
    id = id[id.length-1]
    audit._id = 'resources/'+id
    return agent('PUT', url+'/bookmarks/fpad/clients/'+clientId+'/certifications/'+id)
    .set('Authorization', 'Bearer '+ 'xyz')
    .set('Content-Type', 'application/vnd.oada.rock.1+json')
    .send({_id:'resources/'+id})
    .end()
  }).then(() => {
    return path.success({id, audit, clientId})
  })
}

function validateAudits({state, props, path}) {
  Object.keys(props.audits).forEach((audit) => {
    let valid;
    if (audit.signatures) {
      valid = signatures.verify(audit)
    }
  })
  return path.success({})
}


