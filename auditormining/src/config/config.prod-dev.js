//Production Development Values
const devtoolsPort = 8585;
const oadaDomain = process.env.REACT_APP_OADA_DOMAIN || 'https://api.abcaudits.trellisfw.io';
const oadaDomains = [
  {
    displayText: 'AbcAudits',
    url: 'https://api.abcaudits.trellisfw.io'
  },
  {
    displayText: 'GrowerSync',
    url: 'https://api.growersync.trellisfw.io'
  },
  {
    displayText: 'PspPerfection',
    url: 'https://api.pspperfection.trellisfw.io'
  },
  {
    displayText: 'DistributingExcellence',
    url: 'https://api.distributingexcellence.trellisfw.io'
  },
  {
    displayText: 'RetailFresh',
    url: 'https://api.retailfresh.trellisfw.io'
  },
  {
    displayText: 'localhost',
    url: 'http://localhost'
  },
  {
    displayText: 'vip3',
    url: 'https://vip3.ecn.purdue.edu'
  },
];
const websiteDomain = 'https://auditormining.trellisfw.io:8080';
const metadata = require('./proddev_metadata');
/*`
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYXVkaXRvcm1pbmluZy5mcGFkLmlvOjgwODAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBdWRpdG9yTWluaW5nIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiN2FlNDU0NWQtZTQ5OC00MDJjLWIwNzEtMmU1YTQyNDc3OGU0IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjgzNDV9.2Ezl9wWBiY4VPwKxrMJRs6SqzREJwFQYeK6CieB_OX5eRJ_Q9FV4ZrBlVvVzahYf5894xkxH3aCK2RStBefGYpI46ketOdG5W-OPllT867Jftb8OgvVGE8ojjhFo9HbH0Vn_gpGARNBUYVaXrhc932yXytasKuOTi6N2ozJpffo
`.trim()*/

export default {
	oadaDomain,
  oadaDomains,
  devtoolsPort,
  websiteDomain,
  metadata
}
