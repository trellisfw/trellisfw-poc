import {
  initialize,
	addCertification,
	updateCertifications,
  setClient,
  toggleCertSelect,
  signAudit,
  deleteAudits,
} from './chains.js'

export default {
  state: {
    oada_domain: 'api.abcaudits.fpad.io',
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
    updateCertButtonClicked: updateCertifications,
    certChecked: toggleCertSelect,
    signAuditButtonClicked: signAudit,
    deleteAuditsButtonClicked: deleteAudits,
  },

  modules: {

  },
}
