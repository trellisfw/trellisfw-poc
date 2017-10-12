var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IlJldGFpbEZyZXNoIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiYjE1OTg1ZjEtMTMyOC00OGEzLWEzYjQtNTgzNjVkZmZkMGMzIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4Mjg3ODR9.pMAEcLlSIknGjWMgwQpoLNaJ_O7s2gJFTMRk938UVhQY_APLybsPOdUAGIlfyjhO67KaIBZumS8_KByB2DcS-tBREj00v9liVkHH3beLNSRM8b7cw4XpFy2t7p6ebmuCpBZcemfxC8dX2Xa7QJ69XPw0N-UWEijzh2xfPLZu06g
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'RetailFresh',
    url: 'https://api.retailfresh.fpad.io'
  }
];

if (process.env.NODE_ENV === 'production') {
  //Production values
  _domain = 'https://retailfresh.fpad.io/oauth2/redirect.html';

	_metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9yZXRhaWxmcmVzaC5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiUmV0YWlsRnJlc2giLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJlZjYwYTRmZC1lM2E3LTQ2NGQtOTI1Yy05NGI0MGI3ODRmY2YiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyMjc3N30.wQdjeLB84ENaAyqpYh_mn__f1JGrscO4IGtbLfmIDo4IkYTBE4xvKMRDNhP7zmwRlxibxaQdVSSD9bJLt5W_K1RBvzDB7MysYN2n7o-B7sTLFR7fCG3u6aKoOVaFSWRHrOOReRS9ZskRn1pmqtw-_rdeeDgCuUuADhLTwNc4qyI
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'RetailFresh',
      url: 'https://api.retailfresh.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values on the production server
  _domain = 'https://retailfresh.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9yZXRhaWxmcmVzaC5mcGFkLmlvOjgwODAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJSZXRhaWxGcmVzaCIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6ImI2NDEzYmNiLTU5MGUtNGRmNi1iYWI0LTg0MGQwYmFjYTAxNCIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODIyNzYxfQ.doJZdcR5lN4YyKGZTnC5DesnIQ7txxjHT50-NHKJpCnPwc_FinZ0OXXaZ8HRn6bTvMCn2tFKbyC_gm5KZdiR4_smywAV2alxBmyfMgtu59xFbR_UJacoHVOx6wj8bsjmHkhpLUdB2peeRGDTsQvVjktLIo729wsbcaTgT22NVv0
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'RetailFresh',
      url: 'https://api.abcaudits.fpad.io'
    }
    {
      displayText: 'RetailFresh',
      url: 'https://api.retailfresh.fpad.io'
    }
  ];
}



export default {
  fpadDomain: fpadDomain,
  domain: domain,
  devtoolsPort: devtoolsPort
};
