var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IlBzcFBlcmZlY3Rpb24iLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJhMzgwMDNiNi04YWQxLTQ1NjItYWJjNS1mODFkZDg5MGJjZWIiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyODY1MH0.BabK8Z8Hggp7XEEcyXRSvfhJDV5Sl15izs7Bg68ZNod_AimdzSG7u2O6N-Q7MU4G2EjUmay5ybteMI5btGdpCAPo_9IhTXZSw0WxbS3QE30gK7V9VS-mJORwDQ7u77PvouU0qc6tle-vITSWTsS8kw9Ftz85QadGNMb6zvNeuWk
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'PspPerfection',
    url: 'https://api.pspperfection.fpad.io'
  }
];

if (process.env.NODE_ENV === 'production') {
  //Production values
  _domain = 'https://pspperfection.fpad.io/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9wc3BwZXJmZWN0aW9uLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJQc3BQZXJmZWN0aW9uIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiZTMwMTkxNzktMmUwYi00ZWQxLTg2NmMtODdkZjRiMjA0MDA0IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjM1MTd9.b2HVhbTH9awjGx2b6tBhOMMxiCsVILetkpgnscUKpUBiVX8pXA3gdhXK83lzbvVdNX-UMgM1wwjQX9z0dcqQK73NmiVmMeLvin68v1Ae0jZedezsCRMrxdic5wATyXpxkH5KIWWVvH0HeuabZ4jap49cHGtr2D29_IoHLVYX5jA
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'PspPerfection',
      url: 'https://api.pspperfection.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values on the production server
  _domain = 'https://pspperfection.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9wc3BwZXJmZWN0aW9uLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IlBzcFBlcmZlY3Rpb24iLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJhNDM2MTMxNi03OTBhLTQ1YmMtOTU0NC1kMTFmNmFjZDE5OTEiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyMzQ5Nn0.KGhwLGOtBsJZuuomSEfGtYTtXUgLiVdFVqGeV0Ll-q6C9AKzVHiAWaHwgfzj7gNZYsHh5d12krS0nGTzlbQHzFMXxU9zbPa6fP8UtMKt9M8V3Iz13gJZEaXm9ILupibJ0bPFSC50pmFTGDrsFjTzbBZu869TGVRXUZTuU0vuGJg
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'PspPerfection',
      url: 'https://api.abcaudits.fpad.io'
    }
    {
      displayText: 'PspPerfection',
      url: 'https://api.pspperfection.fpad.io'
    }
  ];
}



export default {
  fpadDomain: fpadDomain,
  domain: domain,
  devtoolsPort: devtoolsPort
};
