var _domain = 'http://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMi9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMy9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNC9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNS9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNi9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNy9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwOC9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwOS9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6Ikdyb3dlclN5bmMiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIwMWE4ZWFjNS1hOWJjLTQ5Y2MtOTBkYS0wYzNkYjNjYzAyYmUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzg2NDQ0MH0
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'vip3',
    url: 'https://vip3.ecn.purdue.edu'
  },
  {
    displayText: 'localhost',
    url: 'https://localhost'
  },
  {
    displayText: 'GrowerSync',
    url: 'https://api.growersync.fpad.io'
  },
];

if (process.env.NODE_ENV === 'production') {
  //Production values
  _domain = 'http://growersync.fpad.io/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vZ3Jvd2Vyc3luYy5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiR3Jvd2VyU3luYyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjRmMDU5YjU4LTM1ZjgtNGNkZC05YmQxLTM0MDcwMDFmZjY2MSIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI3ODM5fQ.neNVOTHC6XOkXsRisGhUpI0z_jxgoHEAVi2kiurO67c17nTwWgENPUWUjemcoiZK6ygIGgX94-SJh_Z6NDdvN4s0aMQjgOAgvfSQf0fXE5Ky1XWlKzT99_IQ90OMO2J28yWJGSwwLfd0Rly3aamiu-Uq0qpsFZzRQkWtYNBI-ZM
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'GrowerSync',
      url: 'https://api.growersync.fpad.io'
		},
		{
			displayText: 'AbcAudits',
			url: 'https://api.abcaudits.fpad.io'
		}
  ];
}

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values on the production server
  _domain = 'https://growersync.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vZ3Jvd2Vyc3luYy5mcGFkLmlvOjgwODAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJHcm93ZXJTeW5jIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiNzBiNTRjZGYtNmZmYS00M2Q0LTlkMGMtNTkxMDk1ZTgxNzk5IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4Mjc4NTR9.osBhP3NdBGcETuIUeliK9OUGWQX36ptqgO5gJtAQfS2BrQzJRx_4oG428ChM76Iqwf1b5VnhHl4bXFcQbceLt5oGD7WJNuBx3hdetJ6NaPy1Ep_-mYbaEUyqp7nzQwzAc9vQRy9BjScLx8HCMQhOycENB_zfjE8QNOoxbhSjHXE
  `.trim()

  _devtoolsPort = 8585;

  _fpadDomains = [
    {
      displayText: 'GrowerSync',
      url: 'https://api.abcaudits.fpad.io'
    },
    {
      displayText: 'vip3',
      url: 'https://vip3.ecn.purdue.edu'
    },
    {
      displayText: 'AbcAudits',
      url: 'https://api.abcaudits.fpad.io'
    }
  ];
}

export const domain = _domain;
export const metadata = _metadata;
export const devtoolsPort = _devtoolsPort;
export const fpadDomains = _fpadDomains;

export default {
  fpadDomains,
  domain,
	devtoolsPort,
	metadata
};
