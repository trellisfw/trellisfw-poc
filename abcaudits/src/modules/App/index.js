import {
  initialize ,
  addCertification,
} from './chains.js'

export default {
  state: {
    token: '',
    model: {
      audits: {
      }
    },
    view: {
      main_panel: {
        mode: 'certifications',
        certs: {
          certs_to_show: {},
          selected_audits: {},
        },
      },
    }, 
  },

  signals: {
    initialize,
    addCertButtonClicked: addCertification,
  },

  modules: {

  },
}
