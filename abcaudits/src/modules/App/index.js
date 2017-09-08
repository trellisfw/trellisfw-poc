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
