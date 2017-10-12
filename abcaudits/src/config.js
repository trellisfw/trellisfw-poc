var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkFiY0F1ZGl0cyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjU5YmE3M2UyLWE4ZDgtNDRiNS1hODExLTdhMmNiYzk1OWUwOSIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI4NDY0fQ.xNWfc9zO-Hn1U-PXHRHY8ZNIQk6rDXEmvlEM_D-9C_iwbzNRWy_elUkFw5NCwQbhXkf-kdhFMoLQRQy_0d3V8BxE0cGnCJSYFiB7ULLDqYvLzTDvkeaJH1HaUGxfUyoVdsl4fUyoywlSfL4hJtK_2VcfrgvqWtfUHirq1M8pMyc
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
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYWJjYXVkaXRzLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJBYmNBdWRpdHMiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIyOWIwNWZjZi01ZjBlLTQ2MDgtYjkxMC1jNWUxNzQxNDhhNmUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyNzc1OH0.i55Tut9mPbFyx3tnXrWMI61gnHRJwf-DA2YPEjDbF2NtkaFdFCbixdBWqV4eERPqfQ0pLr6xhe3FSavasFgFfMeEBMmyekjyyDEdSOLeSBjEigfvvjcnlUpAnhiaC-o2OrygYxMFsewETTmGi_tt21plNzi5nPMt5R7oIVJ4AZ0
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
  _domain = 'https://abcaudits.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYWJjYXVkaXRzLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkFiY0F1ZGl0cyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjBjMTc4YWNmLWZkNTMtNGI1My04NTNmLTEwYWZhOTQ5NTc2YiIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI3NzMzfQ.2Lnc6ghu1-L17RG-l6g_fOHfHs6cIFDrys5zDM9r-n05MjgEsaIS9s9Oh6MqYvTtGxqi2sZaJhDckMxEg2RKFDmWHTk6l8CuPIbtIrJUMndiN71O3wiOJMviPaxSFp6GLPMOWst9Ww5VNrCxy3YnQvfu_dhCO4Iz3xj5jzLIVuo
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
