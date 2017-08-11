import randCert from 'fpad-rand-cert'
import {set, when} from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import templateAudit from './GlobalGAP_FullAudit.js'
import _ from 'lodash'
import Promise from 'bluebird';
import uuid from 'uuid';
import oadaIdClient from 'oada-id-client'
var agent = require('superagent-promise')(require('superagent'), Promise);
//import config from '../../../config.js'

export let setYear = [

]

export let setClient = [
  set(state`app.view.main_panel.selected_client`, props`client`),
  filterCerts,
]

export let initialize = [
  getOadaToken, {
    success: [
      set(state`app.token`, props`token`),
      getOadaAudits, {
        success: [
          set(state`app.model.audits`, props`audits`)
        ],
        error: [],
      },
    ],
    error: [],
  },
]

export let addCertification = [
  addRandomCert, {
    success: [
      set(state`app.model.audits.${props`id`}`, props`audit`),
    ],
    error: [],
  },
] 

function filterCerts({state, props}) {
  let certs = _.filter(state`app.model.audits`, (o) => {
    return o.organization.contacts[0].name === props`client`
  })
  state.set(`app.view.main_panel.certs_to_show`, certs)
}

function addRandomCert({state, props, path}) {
  let org = randCert.randomOrganization()
  let auditor = randCert.randomAuditor()
  let product = randCert.randomProducts(1)[0]
  let operation = randCert.randomOperationTypes(1)
  let year = '2017'
  let scope = randCert.randomScope(org, product, operation)
  let audit = randCert.generateAudit(templateAudit, org, auditor, scope, year, true)
  let id;
  return agent('POST', 'https://api.oada-dev.com/resources')
  .set('Authorization', 'Bearer '+ 'xyz')
  .send(audit)
  .end()
  .then((response) => {
    console.log(response.body)
    console.log(response.headers)
    console.log(response.headers['content-location'])
    id = response.headers['content-location'].split('/')
    id = id[id.length-1]
    return agent('PUT', 'https://api.oada-dev.com/bookmarks/fpad/certifications/audits/id-index/'+id)
    .set('Authorization', 'Bearer '+ 'xyz')
    .send({_id:id})
    .end()
  }).then(() => {
    return path.success({id, audit})
  })
}

function getOadaAudits({state, props, path}) {
  return agent('GET', 'https://api.oada-dev.com/bookmarks/fpad/certifications/audits/id-index')
  .set('Authorization', 'Bearer '+ 'xyz')
  .end()
  .then((response) => {
    console.log(response.body)
    return path.success({audits: response.body})
  })
}

function createInitialAudits({state,props}) {
  console.log(uuid.v4())
/*
  let org = randCert.randomOrganization()
  let auditor = randCert.randomAuditor()
  let product = randCert.randomProducts(1)[0]
  let operation = randCert.randomOperationTypes(1)
  let year = '2017'
  let scope = randCert.randomScope(org, product, operation)
  let audit = randCert.generateAudit(templateAudit, org, auditor, scope, year, true)
  let id = uuid.v4();
  state.set(`app.model.audits.${id}`, audit)
  state.set(`app.view.main_panel.certs.certs_to_show.${id}`, id)
  state.set(`app.view.main_panel.client`, audit.organization.contacts[0].name)
*/
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
