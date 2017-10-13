var overrides = require('./config.dev.js').default;

//----------- Define default configs here ----------

export const auditorRatings = [
  'Terrible!',
  'Poor',
  'Below Average',
  'Average',
  'Good',
  'Great',
  'Amazing!'
];
export const auditorRatingColorScale = ['#0f9246', '#7dbb42', '#fecc09', '#f68e1f', '#ef4723', '#bc2026'];
const defaults = {
  auditorRatings,
  auditorRatingColorScale
};

//--------------------------------------------------

if (process.env.REACT_APP_PROD_DEV) {
  overrides = require('./config.prod-dev.js').default;
} else if (process.env.NODE_ENV === 'production') {
  overrides = require('./config.prod.js').default;
}

var toExport =  {...defaults, ...overrides};

export const oadaDomains = toExport.oadaDomains;
export const oadaDomain = toExport.oadaDomain;
export const websiteDomain = toExport.websiteDomain;
export const redirectDomain = toExport.websiteDomain + '/oauth2/redirect.html';
export const metadata = toExport.metadata;
export const devtoolsPort = toExport.devtoolsPort;

export default toExport;
