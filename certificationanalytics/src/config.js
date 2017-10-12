var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkNlcnRpZmljYXRpb25BbmFseXRpY3MiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJkN2IwOTBiYS1jZjc5LTQzYjQtODk1Yi04ODE3YzM3Mzk5NTUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyODU0M30.g0d4vKt6anyReYQn9-yOQs_b4_cBQsuXylXwFT62BotDIjZHRqJWsELdhfmHiyQ2Cs5w8B-Kxyy4XWZD4nKmq-Vr_V8f3384Ci8_5mwSSHlsaynYepjVfunPYToPeAZN7x44vcMWcfPFcy7mh3NmNudxqwdiztmFsDP-ZKoU3DY
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'CertificationAnalytics',
    url: 'https://api.certificationanalytics.fpad.io'
  }
];

if (process.env.NODE_ENV === 'production') {
  //Production values
  _domain = 'http://certificationanalytics.fpad.io/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vY2VydGlmaWNhdGlvbmFuYWx5dGljcy5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiQ2VydGlmaWNhdGlvbkFuYWx5dGljcyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6ImZhMWViY2U0LTdkYTAtNDAwNS04MzJlLTlkYmRjYzRmNzYzYiIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI4MTM1fQ.LEpsmh2iUP_r9uvd7vJ0Dk4BFgf3LpzpkmtBwHjt8AjfkvFGJvRaG2hyRXWdH-5ehkrBYyalWI4Kq34MgDGi4vfyNMNoVEL7gn_4LiGqZ6WZXgLDYxi-YhKgKxIZ8I64Hp0OaqBZP0PG6x_O0A8iVP2k2tKmMI94KNQQwidU8rM

  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'CertificationAnalytics',
      url: 'https://api.certificationanalytics.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values on the production server
  _domain = 'https://certificationanalytics.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vY2VydGlmaWNhdGlvbmFuYWx5dGljcy5mcGFkLmlvOjgwODAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJDZXJ0aWZpY2F0aW9uQW5hbHl0aWNzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiMDQ1Y2UyOWEtOWY1OC00NDcxLWJiYzgtOWExYzZlYWY3MzJiIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjgxMTJ9.0qpUcT2-adigHn41uuy0SbdrRJpBhVUpeCz-ZhWU1sZZes460UtTbJftVv7POwYbpDR4uNUS9wgYmVkL7759EhSRWV82oF421O88iMPHhSTGJoEX5QScjA0eTx_XKDzoutMpCAZLX5qNYzmE_plLDlvEFH-nnnhd_vWgr8ZklOs
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'CertificationAnalytics',
      url: 'https://api.abcaudits.fpad.io'
    }
    {
      displayText: 'CertificationAnalytics',
      url: 'https://api.certificationanalytics.fpad.io'
    }
  ];
}



export default {
  fpadDomain: fpadDomain,
  domain: domain,
  devtoolsPort: devtoolsPort
};
