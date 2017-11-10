import {
  initialize,
	addCertification,
	updateCertifications,
  toggleCertSelect,
  signAudit,
	deleteCertifications,
	showViewer,
	closeViewer
} from './chains.js'
import {
	oadaDomain,
} from '../../config'

export default {
  state: {
    oada_domain: oadaDomain,
    token: '',
		view: {
			loading: false,
      mode: 'certifications',
      certifications: {},
		},
		model: {
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
		closeViewerClicked: closeViewer,
  },

  modules: {

  },
}
