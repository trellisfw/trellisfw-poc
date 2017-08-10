
export default {
  state: {
    model: {
      audits: {
        abc: {
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
        },
      }
    },
    view: {
      main: {
        mode: 'certifications'
      }
    }, 
  },

  signals: {
  
  },

  modules: {

  },
}
