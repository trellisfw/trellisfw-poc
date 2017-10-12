var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkRpc3RyaWJ1dGluZ0V4Y2VsbGVuY2UiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIxMzkzMGU1NS0yZjI2LTQyMjctOTRmNi02ZTVlZmE4YzhjNWYiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyODU4MH0.k8_oG1SSEZUUHc7eVV7D4VL-KfKGmtujTurs2PRKBkjhxyaANpOiMx5aSCo8M8Oxmas5h9N0l9jWo8bftpiQtoKyb9cYOnujUwkg8s2NIQPu5-srjQyYR_snK6a14h5E8_zMWMWvraEa524_hkpPCX2e3_yLJa1JVFSUgkNPwII
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [

  {
    displayText: 'localhost',
    url: 'http://localhost'
  },
  {
    displayText: 'DistributingExcellence',
    url: 'https://api.distributingexcellence.fpad.io'
  },
  {
    displayText: 'vip3',
    url: 'https://vip3.ecn.purdue.edu'
  },
];

if (process.env.NODE_ENV === 'production') {
  //Production values
  _domain = 'http://distributingexcellence.fpad.io/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vZGlzdHJpYnV0aW5nZXhjZWxsZW5jZS5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiRGlzdHJpYnV0aW5nRXhjZWxsZW5jZSIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6ImY5OWI1NTY3LTkxNGYtNDI0Ni05YTYzLTk0NWViMTZiNjdmYyIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI3OTI1fQ.IVfhu1OvsnT4RrUaPs9ftHDw1bKXOTvQ4FfKD_E_IzLIELoyD9_H2zIgaCsEY849cKVpJOfukEBYo5g5hBWpZGZVboZkznugI-c-eTdc4y5Cfx-0QuJYKUde76cOtGGeLY289t0ZlaXyNVnzIseB5HJkCy2veqSJ6kTOwJgP4XE
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'DistributingExcellence',
      url: 'https://api.distributingexcellence.fpad.io'
    }
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values on the production server
  _domain = 'https://distributingexcellence.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vZGlzdHJpYnV0aW5nZXhjZWxsZW5jZS5mcGFkLmlvOjgwODAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJEaXN0cmlidXRpbmdFeGNlbGxlbmNlIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiNGVlZTYyNTEtOGRiMi00ZjRjLWI1YzctZmNmNDAxOGNhZjc1IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4Mjc5MDR9.vj3Bl4J6532F5OGLs2_fBNbghmjnH5rEfv1WscJ0_Ta-egeAlmISgHgvKwiCAQWeEXcvd8EVUC_wMgfh54LW3ZEViGVGonKVRiAkFBsYYZ_ialjHphWixnrvhYnn_7IpU1oxWJiLEwE1qWwE6Y4qM6swaFVTgJlFOpdJbLeJmLs
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
    },
  ];
}



export default {
  fpadDomain: fpadDomain,
  domain: domain,
  devtoolsPort: devtoolsPort
};
