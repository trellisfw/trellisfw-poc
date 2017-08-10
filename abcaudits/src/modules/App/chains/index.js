import randCert from 'fpad-rand-cert'
import {set, when} from 'cerebral/operators'
import {state, props, string} from 'cerebral/tags'
import templateAudit from './GlobalGAP_FullAudit.js'
import _ from 'lodash'
import uuid from 'uuid'

export let initialize = [
  createInitialAudits,
]

function createInitialAudits({state,props}) {
  let org = randCert.randomOrganization()
  let auditor = randCert.randomAuditor()
  let product = randCert.randomProducts(1)[0]
  let operation = randCert.randomOperationTypes(1)
  let year = '2017'
  let scope = randCert.randomScope(org, product, operation)
  let audit = randCert.generateAudit(templateAudit, org, auditor, scope, year, true)
  let id = uuid.v4();
  state.set(`app.model.audits.${id}`, audit)
}
