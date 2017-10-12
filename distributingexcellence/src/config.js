var _domain = 'https://distributingexcellence.fpad.io/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9kaXN0cmlidXRpbmdleGNlbGxlbmNlLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJEaXN0cmlidXRpbmdFeGNlbGxlbmNlIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiMmYxZGE3NWItMjk2Mi00YmU2LWEyOWUtN2JkNGNiOWMzODkwIiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MTc1MzZ9.EpplKlq-arHtAN8BpTrigG67ZefsyUBOVZJa2TOIOJ1NyQbMvCmsvWJomix0siQ3_n5wUY3jQf8y-k60ACe9kM0lubNwJOpDpUK4Nvcz18BDQFklMlNttD45KkeKibGo3aCJgmbq-jttRi3BzyP8KAMtP4stwvxAuu-FwlBzeXk
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'DistributingExcellence',
    url: 'https://api.distributingexcellence.fpad.io'
  }
];

if (process.env.NODE_ENV !== 'production') {
  //DEV values
  _domain = 'http://localhost:3000/oauth2/redirect.html';

	_metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkRpc3RyaWJ1dGluZ0V4Y2VsbGVuY2UiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiI5ZWQ1ZGZhZS1jYWVlLTRjYzItYTc0ZS03ZTVkODVjNzA2ZWYiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgxNzU2OH0.tMhimhZqE89tmpIjEHyXsYPlodlDe6s6fB-Cyhc_9mrtGtT1zS2dbyLhvuZj7rblIgrvH2E9BmxIO5piS9sr70TmbccEjj6F_aELgq7w-Dn_5khSrwp5JOYRTwD0fD5DbcUzsIhYK8-fIguCZMNArQFgLcrqURMR9cdkZncSczU
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
  //DEV values
  _domain = 'http://distributingexcellence.fpad.io:8080/oauth2/redirect.html';

	_metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9kaXN0cmlidXRpbmdleGNlbGxlbmNlLmZwYWQuaW86ODA4MC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkRpc3RyaWJ1dGluZ0V4Y2VsbGVuY2UiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJiMTM4MmZmMy1iOGMwLTQ1MmItYjk2NS03NDJiMDYxYTBkOWMiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgxNzQ5M30.NzXJ0QrECB_DHour1PyLqSVaRT5GL_8YF85PRDZust9rXTJezph4IBhu3O2LsYYpOkzKvBi828_QQvcZQ_eMYwhNz6ZFbweDOKSgS3WJ0C3UVr-B5LIRqRLgzTgiP_iCnfBwx-OutlDXIH6wQ-TE6Mw_t6FKpiwnEX2vRjH_J0U
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
