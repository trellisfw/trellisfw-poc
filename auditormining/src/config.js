// Local dev values
var _domain = 'http://localhost:3000/oauth2/redirect.html';

var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkF1ZGl0b3JNaW5pbmciLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIzNDAwMDVkZS1kZDdmLTRkMTQtOWZhZS0xZWVhOWZjNzdmNTUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyODM2Nn0.bcK9EruBRtoVjsCYXPjH5Ghx3uT9vsWiTiw6bow2YoA6UwKGTTDX_GMMrmS3m1IREcZ_1g3Zoa9C32DI-h2wBjwpzeUMDzCBUmfRv3sUUzMuTHtvYzUquBxYJnJlefKbqUXAqKg4hIpL6WaHIdj6agy5giif1oGEh8yUakTFweE
`.trim()

var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'ABC Audits',
    url: 'https://api.abcaudits.fpad.io'
  }
];

if (process.env.NODE_ENV === 'production') {
	//DEV values
	_domain = 'https://auditormining.fpad.io/oauth2/redirect.html';
	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYXVkaXRvcm1pbmluZy5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiQXVkaXRvck1pbmluZyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjY5MGM0ZTA3LWJkNjctNGY0Zi04ZWRiLTc1YTU0YWFmMGYwNyIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI4MzE4fQ.Od10pBHJ3Hnl6WD3DKU7yfI9sw1-zN9ZAK2gEzVFRiSm38N3FoRz8KXpvWoZnbgnPHBCiIlyBstfhdit3IiVReKVD5jKJaxRc4mI00FlPgrXVhHTk421M63XiwvgFya-a1GMGWeRslB0GfNpmTSVNT1W9B6CCMN4XibATXdss7c
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

if (process.env.REACT_APP_PROD_DEV) {
  //DEV values
  _domain = 'https://auditormining.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYXVkaXRvcm1pbmluZy5mcGFkLmlvOjgwODAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBdWRpdG9yTWluaW5nIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiN2FlNDU0NWQtZTQ5OC00MDJjLWIwNzEtMmU1YTQyNDc3OGU0IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjgzNDV9.2Ezl9wWBiY4VPwKxrMJRs6SqzREJwFQYeK6CieB_OX5eRJ_Q9FV4ZrBlVvVzahYf5894xkxH3aCK2RStBefGYpI46ketOdG5W-OPllT867Jftb8OgvVGE8ojjhFo9HbH0Vn_gpGARNBUYVaXrhc932yXytasKuOTi6N2ozJpffo
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
