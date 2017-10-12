var _domain = 'https://localhost:3000/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkNlcnRpZmljYXRpb25BbmFseXRpY3MiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiI3ZmJiZDRjMS0wOWY4LTQxMGEtYTA3Ny1mNDBhNzdhMWMxMTQiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyMzM0N30.M5hHtsn8u9Y4n2ThriLDsImZwI7IpR6td7oRrHomJCLzh1NiMPrS3Dnx3EJMUVOeZL_NLE5nwOvYtua94BF_BekV1VoFvCJfqonffsYjm01Il3XXaj7iqYWtljTYM4EK2j2pqWpRXQo7kHmHxnsma_Lw2dDzCGzZ8LnXHkyJEp4
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
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9jZXJ0aWZpY2F0aW9uYW5hbHl0aWNzLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJDZXJ0aWZpY2F0aW9uQW5hbHl0aWNzIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiM2Q5OTQ1MzQtNTRiZC00MDMxLWIyYmItNGQ5YzQ2MDkzOTgwIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjMzMjd9.f694cCkvZTcZmd6cFkManHayifdIOsTvyGUES_ob0HERPTkg8akZ6gciHc8mTG5G1VxmL8OCm85r3sxHZ83yLOrJCvl-W1hoZhvJY38zdnjI1sFCGeShwq4RuOORlUc6qibPqAdhPrUrgW-UkXFqb2BsEeA04D7wb74AEy7v_Xc
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
  _domain = 'http://certificationanalytics.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9jZXJ0aWZpY2F0aW9uYW5hbHl0aWNzLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkNlcnRpZmljYXRpb25BbmFseXRpY3MiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJmMjdhYTgwMS00ZDU5LTRiNjgtODFmYS05YzM3OTMwNGY0ZTIiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyMzI5N30.iruy44-ETPjgn0LPhZoFZ6H0lsRyD8BLiMJXw0X7eEVKRytw9kj9q3U179LxZ9rCGM4xwMcdyH2iQ2ltJSRsh2wX4sbeNNv5B27iNRMHlG6bTMTPtNP0JuhbI-k-4a5hT5AipJ3SSuUguvvxxkaZ6ZBRJQ5vFmVlGNPuXGTyY2s
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
