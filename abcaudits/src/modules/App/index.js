import {
  initialize ,
  addCertification,
  setYear,
  setClient,
} from './chains'

export default {
  state: {
    token: '',
    model: {
      audits: {
/*        abc: {
          score: '92',
          product: 'Cherries',
          expiration: '2016',
          organization: 'Gary Grower',
          from: 'DistributingExcellence',
          valid: true,
        },
        def: {
          score: '95',
          product: 'Cherries',
          expiration: '2017',
          organization: 'Frank Farmer',
          from: 'DistributingGreatness',
          valid: false,
        }, */
      }
    },
    view: {
      main_panel: {
        mode: 'certifications',
        certs: {
          certs_to_show: {},
          selected_audits: {},
        },
        client: '',
      },
    }, 
  },

  signals: {
    initialize,
    addCertButtonClicked: addCertification,
    yearClicked: setYear,
    clientClicked: setClient,
  },

  modules: {

  },
}
