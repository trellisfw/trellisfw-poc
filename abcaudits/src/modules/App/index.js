import {
  initialize ,
  addCertification,
  setClient,
  toggleCertSelect,
  signAudit,
  deleteAudits,
} from './chains.js'

export default {
  state: {
    oada_domain: 'vip3.ecn.purdue.edu',
    token: '',
    model: {
      audits: {
      }
    },
    view: {
      mode: 'certifications',
      certifications: {},
    },
  },

  signals: {
		initialize,
    addCertButtonClicked: addCertification,
    certChecked: toggleCertSelect,
    signAuditButtonClicked: signAudit,
    deleteAuditsButtonClicked: deleteAudits,
  },

  modules: {

  },
}
