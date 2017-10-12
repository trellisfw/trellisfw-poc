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
	fpadDomains,
} from '../../config.js'

export default {
  state: {
    oada_domain: fpadDomains[0].url,
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
