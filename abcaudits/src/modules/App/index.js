import {
  initialize,
	addCertification,
	updateCertifications,
  setClient,
  toggleCertSelect,
  signAudit,
	deleteAudits,
} from './chains.js'
import {
	apiServer,
} from '../../config.js'

export default {
  state: {
    oada_domain: apiServer,
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
