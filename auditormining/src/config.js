export const domain = 'http://localhost:3000/oauth2/redirect.html'; //'https://abcaudits.fpad.io/oauth2/redirect.html'
export const devtoolsPort = 8585;
export const fpadDomains = [
  {
    displayText: 'GrowerSync.com',
    url: 'https://vip3.ecn.purdue.edu'
  }
];
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
export default {
  auditorRatings: auditorRatings,
  auditorRatingColorScale: auditorRatingColorScale,
  fpadDomains: fpadDomains,
  domain: domain,
  devtoolsPort: devtoolsPort
};
