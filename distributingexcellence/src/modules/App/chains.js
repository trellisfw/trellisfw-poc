import randCert from 'fpad-rand-cert'
import { set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import templateAudit from './GlobalGAP_FullAudit.js'
import _ from 'lodash'
import Promise from 'bluebird';
import uuid from 'uuid';
import oadaIdClient from 'oada-id-client'
import signatures from 'fpad-signatures'
var agent = require('superagent-promise')(require('superagent'), Promise);

export let toggleCertSelect = [
  set(state`app.view.certifications.${props`name`}.selected`, props`checked`)
]

export let setClient = [
  set(state`client_panel.selected_client`, props`client`),
  filterCerts,
]

export let initialize = [
//  getOadaToken, {
//    success: [
//      set(state`app.token`, props`token`),
      getOadaAudits, {
        success: [
          set(state`app.model.audits`, props`audits`),
          set(props`client`, 'Nola Rath'),
          validateAudits, {
            success: [],
            error: [],
          },
          filterCerts,
        ],
        error: [],
      },
//    ],
//    error: [],
//  },
]

function validateAudits({state, props, path}) {
  console.log(signatures)
  return path.success({})
}

export let addCertification = [
  addRandomCert, {
    success: [
      set(state`app.model.audits.${props`id`}`, props`audit`),
      filterCerts,
    ],
    error: [],
  },
] 

function filterCerts({state, props}) {
  let audits = state.get('app.model.audits')
  let client = props.client
  let keys = {} 
  Object.keys(audits).forEach((key) => {
    if (audits[key].organization.contacts[0].name === client) keys[key] = {selected: false}
  })
  state.set(`app.view.certifications`, keys)
}

function addRandomCert({state, props, path}) {
  let a = state.get('app.view.certifications')
  let audits = state.get('app.model.audits')
  let org = randCert.randomOrganization();
  if (audits && _.keys(audits).length && a && _.keys(a).length) {
    org = audits[Object.keys(a)[0]].organization
  }
  let auditor = randCert.randomAuditor()
  let product = randCert.randomProducts(1)[0]
  let operation = randCert.randomOperationTypes(1)
  let year = '2017'
  let scope = randCert.randomScope(org, product, operation)
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
    console.log('https://api.oada-dev.com/bookmarks/fpad/certifications-index/'+id)
    return agent('PUT', 'https://api.oada-dev.com/bookmarks/fpad/certifications-index/'+id)
    .set('Authorization', 'Bearer '+ 'xyz')
    .set('Content-Type', 'application/vnd.oada.rock.1+json')
    .send({_id:'resources/'+id})
    .end()
  }).then(() => {
    return path.success({id, audit, client: org.contacts[0].name})
  })
}

function getOadaAudits({state, props, path}) {
  let audits = {}
  let ids = {}
  return agent('GET', 'https://api.oada-dev.com/bookmarks/fpad/certifications-index/')
  .set('Authorization', 'Bearer '+ 'xyz')
  .end()
  .then((response) => {
    return Promise.map(Object.keys(response.body), (key) => {
      if (key.charAt(0) === '_') return false
      return agent('GET', 'https://api.oada-dev.com/resources/'+key)
      .set('Authorization', 'Bearer '+ 'xyz')
      .end()
      .then((res) => {
console.log('DONE Got this audit: ', key);
        return audits[key] = res.body;
      })
    }, {concurrency:5})
  }).then(() => {
    return path.success({audits})
  })
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
