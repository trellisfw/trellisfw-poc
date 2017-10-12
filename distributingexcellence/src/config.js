var _domain = 'https://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkRpc3RyaWJ1dGluZ0V4Y2VsbGVuY2UiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJhZTliZGM2Yy0zZGIyLTQwMzMtYmIzMS02YTlmNDc2ODM2ODUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyMzEzOH0.HUHoAcDPiy0ckn4E8GdC8WN6TMxEe6g1YU7uXbrZ6raJjd-gEQ6tXT1rRq9oJd68S-pN9bhay9Y6v8du5kdvbiFdjawt-AxVN4syQD-lGo7MwMFojOpGVKQZadkRpehbn8tdKp-IWKm8UsrXRBE6rVPZVoUOqMWh9qFz7bUiQ8A
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'DistributingExcellence',
    url: 'https://api.distributingexcellence.fpad.io'
  }
];

if (process.env.NODE_ENV === 'production') {
  //Production values
  _domain = 'http://distributingexcellence.fpad.io/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9kaXN0cmlidXRpbmdleGNlbGxlbmNlLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJEaXN0cmlidXRpbmdFeGNlbGxlbmNlIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiOGMwNWIzYWQtZWZjMS00NzlmLTkyMDUtNjc2ZWQ2N2UzMTE5IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjMxNzJ9.pVqV3OJ6jCgH8_tt1-QeOxx5SVMTlR79Nl_RW7WCu6tbASmVijIEvb0pls8JEGrUOUB76LVcmtEcpObAmI_Mb4ZSLdnxVkbbR3l4WRZ29BXpPswoxcx5ia6WbIynGwaiDZcVgOVUOMYPiu6cIG48ZZcpcMl-XEGx8k1ue_76UcQ
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'DistributingExcellence',
      url: 'https://api.distributingexcellence.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values on the production server
  _domain = 'http://distributingexcellence.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9kaXN0cmlidXRpbmdleGNlbGxlbmNlLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkRpc3RyaWJ1dGluZ0V4Y2VsbGVuY2UiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiI1YWM4OWUyNC00YzRmLTQ5YTgtYTNmOC00NGU3NjUwNzNkNzUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyMzE5NH0.RmpUkXF5nDYskQwci4obuZvr2NWKfk1R3Ujvkyda5N4pg451Dz4cUSZG6SSDzAu4JZBPE1aNFVhNp21oJ-s9iZdiXjLUPMyqGaXPBHZVHcKSHs-U7mK6fjjAFN64UABD0NLZZGF9TicBOdpjAS2fNHJU__RkMhmlRcdzBl0qQ4s
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'DistributingExcellence',
      url: 'https://api.abcaudits.fpad.io'
    }
    {
      displayText: 'DistributingExcellence',
      url: 'https://api.distributingexcellence.fpad.io'
    }
  ];
}



export default {
  fpadDomain: fpadDomain,
  domain: domain,
  devtoolsPort: devtoolsPort
};
