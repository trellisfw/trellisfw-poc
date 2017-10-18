var overrides = require('./config.dev.js').default;

//----------- Define default configs here ----------

//export const whatever = 'value';
const defaults = {
  //whatever
};

//--------------------------------------------------

if (process.env.REACT_APP_PROD_DEV) {
  overrides = require('./config.prod-dev.js').default;
} else if (process.env.NODE_ENV === 'production') {
  overrides = require('./config.prod.js').default;
}

var toExport =  {...defaults, ...overrides};

export const oadaDomain = toExport.oadaDomain;
export const websiteDomain = toExport.websiteDomain;
export const redirectDomain = toExport.websiteDomain + '/oauth2/redirect.html';
export const metadata = toExport.metadata;
export const devtoolsPort = toExport.devtoolsPort;
export const title = 'ABC Audits';
export const description = 'Audits done right!'
export const background = '#a0c5f9'

export default toExport;
