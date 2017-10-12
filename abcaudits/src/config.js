var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkFiY0F1ZGl0cyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6ImM2MGJiZmZiLWRkODItNDJjYi04ZDc2LTAwM2M2YjM2NzlmNiIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODE5NDU0fQ.Gsi4vP5RKNfEa7dB-6i56l-frv8mYiZOIrz4_U7An2T1PgTXHsWyqelxwvBOwoJDnqvLaq7HfM3HhYNyDbCol2SQrIJ45t4XowQZFk58xfdEvJyHX81mJJujyjByZADPnyqhVj_ZTzdGkKwhZSO3pugm9U4UPMKHk6cdk_44GKY
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'ABC Audits',
    url: 'https://api.abcaudits.fpad.io'
  }
];

//production values
if (process.env.NODE_ENV === 'production') {
	_domain = 'https://abcaudits.fpad.io/oauth2/redirect.html';

	_metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9hYmNhdWRpdHMuZnBhZC5pby9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkFiY0F1ZGl0cyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjIyY2M1MjMyLTU1YzQtNGYwYy04YzJhLWU3MmRiOWZhYzIzMCIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODE5MTI2fQ.pxGu7j5daGBAZMEql9kz2LdrGVSO6PP9no3pmKbzKZLw2SSvNAQ5JYd20KmTOlDTJhEj8PT1qWHPQdUnhGkrDwFmgE2DNa0iz_beaHT0PZhN7PFBq320KolQhM2D-f_tEmpkh61p6FhAPA6xokpyzmCA94o4ApHKyp07MFoWMkg
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
  _domain = 'http://abcaudits.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9hYmNhdWRpdHMuZnBhZC5pbzo4MDgwL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiQWJjQXVkaXRzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiYzRlZTAxNzAtNjUxZS00NDUwLWJhNmMtMzU1MGQwNmFlNDU2IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjEzNzN9.jA2e0YD-WjWV6ogxdS3JZ5FRf4YakrWmKT-Da4vO231sX70UmZvLXto-kd0w9QWfzbF44Zpp1rwDminfjLgd32lhC1HoJfKjXkABUL3v8UGwwP_gSAcH8BOlN_oLKUk6jhTSBfV8mkneAA3jo1iQdGfODdk-fVuWL_wR1Z4jBpE
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
export default {
  fpadDomains: fpadDomains,
  domain: domain,
  metadata: metadata,
  devtoolsPort: devtoolsPort
};
