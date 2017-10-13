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
	oadaDomain,
} from '../../config'

export default {
  state: {
    oada_domain: oadaDomain,
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
