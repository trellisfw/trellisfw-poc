var overrides = require('./config.dev.js').default;

//----------- Define default configs here ----------

export const sharePassword = '$2a$10$l64QftVz6.7KR5BXNc29IORcuhcay48jl9f5jb4dOneuGMPcrkCLC';
export const tabColor = '#0000aa';
export const title = 'AbcAudits';
export const description = 'Audits done right!'
export const background = '#a0c5f9'
export const sharingUsername = 'gary@gmail.com';
export const sharingDomain = 'https://api.growersync.trellisfw.io';
const defaults = {
  sharePassword,
  title,
  description,
  background,
	tabColor,
	sharingUsername,
	sharingDomain
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

export default toExport;
