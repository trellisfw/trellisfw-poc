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
//import config from '../../../config.js'

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
    return agent('PUT', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+clientId+'/certifications/'+props.audit._id.split('/')[1]+'/signatures')
    .set('Authorization', 'Bearer xyz')
    .set('Content-Type', 'application/vnd.oada.rock.1+json')
    .send(signatures)
    .end()
    .then((res) => {
      return path.success({signatures, id: audit._id.split('/')[1]})
    })
  })
}

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

function deleteSelectedAudits({state, props, path}) {
  let clientId = state.get('client_panel.selected_client')
  let selectedCertifications = _.selectBy(state.get(`app.view.certifications`), 'selected')
  let certifications = state.get(`client_panel.clients.${clientId}.certifications`)
  return Promise.map(selectedCertifications, (key) => {
    return agent('DELETE', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+clientId+'/certifications/'+key)
    .set('Authorization', 'Bearer '+ 'xyz')
    .end()
    .then(() => {
      return agent('PUT', 'https://api.oada-dev.com/resources/'+key)
      .set('Authorization', 'Bearer '+ 'xyz')
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
  return agent('POST', 'https://api.oada-dev.com/resources')
  .set('Authorization', 'Bearer '+ 'xyz')
  .set('Content-Type', 'application/vnd.oada.rock.1+json')
  .send(audit)
  .end()
  .then((response) => {
    id = response.headers.location.split('/')
    id = id[id.length-1]
    audit._id = 'resources/'+id
    return agent('PUT', 'https://api.oada-dev.com/bookmarks/fpad/clients/'+clientId+'/certifications/'+id)
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

function getOadaToken({state, path}) {
  var options = {
    metadata: 'eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vdHJpYWxzdHJhY2tlci5vYWRhLWRldi5jb20vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjgwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJUcmlhbHMgVHJhY2tlciIsImNsaWVudF91cmkiOiJodHRwczovL2dpdGh1Yi5jb20vT3BlbkFUSy9UcmlhbHNUcmFja2VyIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjVjYzY1YjIwLTUzYzAtNDJmMS05NjRlLWEyNTgxODA5MzM0NCIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNDc1NjA5NTkwfQ.Qsve_NiyQHGf_PclMArHEnBuVyCWvH9X7awLkO1rT-4Sfdoq0zV_ZhYlvI4QAyYSWF_dqMyiYYokeZoQ0sJGK7ZneFwRFXrVFCoRjwXLgHKaJ0QfV9Viaz3cVo3I4xyzbY4SjKizuI3cwfqFylwqfVrffHjuKR4zEmW6bNT5irI',
    scope: 'food-safety-certifications',
    redirect: 'http://localhost:3000/oauth2/redirect.html',
  }
  return new Promise((resolve) => {
    oadaIdClient.getAccessToken('api.oada-dev.com', options, function(err, accessToken) {
      if (err) { console.dir(err); return resolve(path.error(err)); } // Something went wrong  
      return resolve(path.success({token:accessToken.access_token}));
    })
  })
}
