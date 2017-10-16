import {
  initialize,
	addCertification,
	updateCertifications,
  toggleCertSelect,
  signAudit,
	deleteCertifications,
	showViewer,
} from './chains.js'
import {
	oadaDomain,
} from '../../config'

export default {
  state: {
    oada_domain: oadaDomain,
    token: '',
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
		deleteAuditsButtonClicked: deleteCertifications,
		certViewerClicked: showViewer,
  },

  modules: {

  },
}
