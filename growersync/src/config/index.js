var overrides = require('./config.dev.js').default;

//----------- Define default configs here ----------

export const sharePassword = '$2a$10$l64QftVz6.7KR5BXNc29IORcuhcay48jl9f5jb4dOneuGMPcrkCLC';
const defaults = {
  sharePassword
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
export const defaultNewConnectionURL = toExport.defaultNewConnectionURL;
export const title = 'GrowerSync';
export const description = 'Automatic Data Connections for Growers';
export const background = '#b6d7a8';

export default toExport;
