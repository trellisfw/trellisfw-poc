import {
  initialize ,
  addCertification,
  setClient,
  toggleCertSelect
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
    clientClicked: setClient,
    certChecked: toggleCertSelect,
  },

  modules: {

  },
}
