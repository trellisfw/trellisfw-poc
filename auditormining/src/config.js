var _domain = 'https://auditormining.fpad.io/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYWJjYXVkaXRzLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBQkMgQXVkaXRzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiZjk0ZmE3MWMtMWQ2Mi00YjAyLTlhMWItMjcxYTVkZTRjMGEzIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDQ4NDI1Njl9.Yx9-uzUv4IhgXVWmtXZMHYXMXEr7-4Ww2UotLzTTUNYCaGcU8SPtN1aM6SXfCNK7XHgR6xt3viJPUQ_H2ivCugx-bs39Xwof7aV1JH0XBYN3_5EY5_hQmO3H5YBbDBZvygGAs4iLjHY2l_JiU6A5ty1nGxxQRR2kFo3GXiMZQGo
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'ABC Audits',
    url: 'https://api.abcaudits.fpad.io'
  }
];

if (process.env.NODE_ENV !== 'production') {
  //DEV values
  _domain = 'http://localhost:3000/oauth2/redirect.html';

  _metadata = `
  eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYWJjYXVkaXRzLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBQkMgQXVkaXRzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiZjk0ZmE3MWMtMWQ2Mi00YjAyLTlhMWItMjcxYTVkZTRjMGEzIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDQ4NDI1Njl9.Yx9-uzUv4IhgXVWmtXZMHYXMXEr7-4Ww2UotLzTTUNYCaGcU8SPtN1aM6SXfCNK7XHgR6xt3viJPUQ_H2ivCugx-bs39Xwof7aV1JH0XBYN3_5EY5_hQmO3H5YBbDBZvygGAs4iLjHY2l_JiU6A5ty1nGxxQRR2kFo3GXiMZQGo
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'ABC Audits',
      url: 'https://api.abcaudits.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV !== 'prod-dev') {
  //DEV values
  _domain = 'http://auditormining.fpad.io:8080/oauth2/redirect.html';

  _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9hdWRpdG9ybWluaW5nLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkF1ZGl0b3IgTWluaW5nIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiNzE3MThhZTItYWE3OC00YWM2LWE4ZGItMzI4NzdjODIzZWU0IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc3NzMzMTV9.d8h0luhL8Sm0gduBcuWvUUKXJaCuYVWslR426D45hQLPHQYB83kVykdPsJkhNilyeiKiTeqrK_YjS4m3apeMwIIe63Yqom1Evcezg2_4sSuYP19q2DNLV9l6yv1k94GH9XIYr5bi_TvOougHOD924rh8i3HyX8ymzY33MR3UB0s
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'ABC Audits',
      url: 'https://api.abcaudits.fpad.io'
    }
  ];
}

export const domain = _domain;
export const metadata = _metadata;
export const devtoolsPort = _devtoolsPort;

export const fpadDomains = _fpadDomains;
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
  metadata: metadata,
  devtoolsPort: devtoolsPort
};
