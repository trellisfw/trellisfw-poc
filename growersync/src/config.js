var _domain = 'https://growersync.fpad.io/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9ncm93ZXJzeW5jLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJHcm93ZXJTeW5jIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiMDgyMjJjNmItYzVkOC00MWQ3LTg2ZjctNDEzNTlmZTZmZGNkIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc3NzM5MTV9.QlRadb-olYbBgfGslBccrIKzM_5mrC4hl5EwPjI67Mc8wqBAz_EamIPsJnEdzQhtplQxpFg848p1wCpUa-mB73Yb2XETYXFILJ9xrD-r4Hf93fBb4tp6nyKB2UHyxBF_QGrycnFvqGjawvxlKNqjg1xOkqJvVVxl1f8eWDyixww
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'GrowerSync',
    url: 'https://api.growersync.fpad.io'
  }
];

if (process.env.NODE_ENV !== 'production') {
  //DEV values
  _domain = 'http://localhost:3000/oauth2/redirect.html';

  _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6Ikdyb3dlclN5bmMiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJjMjFlOThjMC1jOWY4LTQ0MmUtOTE5MS0wYjczYWM3NDllMTUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzc3Mzg4Mn0.SYAo_kGj_uMTwzuDtx2zkYj2x5McgVhEQZVls5lshECGxD3OrzBNA9TP4j3qLdAUSFBMJjOcG3atfhI8M7NTW-8d_1HEhb0zZV7Git_kpKS1PNFN3l5K21xDY_jIkaOen8L7r8G1yGf2kEjZy2F1t8zgL1eQHMoLsak7aVkkDlQ
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'GrowerSync',
      url: 'https://api.growersync.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values
  _domain = 'http://growersync.fpad.io:8080/oauth2/redirect.html';

  _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9ncm93ZXJzeW5jLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6Ikdyb3dlclN5bmMiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIxNzIyYzg1Ny1mNjNhLTRiZWQtOTZlNC01NjdmNWRkNjc5MjkiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzc3Mzk0OH0.kadGIpK-BMQqZoLPlpyyTtIpZNwh0ZXoFaI6Ot0m4PxwqGdsb-cKEDkuZvu-g2YDSs55sVlWMaxj1YvUVN0JTpuUt78_-nST82imvy0I5Zhx3InkJdJssxJYhDwrk50IhFyGi79jaJlkbDp9lKuA26KXu7xuqsi9No8SMWAkQEw
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'GrowerSync',
      url: 'https://api.abcaudits.fpad.io'
    }
    {
      displayText: 'GrowerSync',
      url: 'https://api.growersync.fpad.io'
    }
  ];
}



export default {
  fpadDomain: fpadDomain,
  domain: domain,
  devtoolsPort: devtoolsPort
};
