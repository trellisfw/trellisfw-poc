var _domain = 'https://abcaudits.fpad.io/oauth2/redirect.html';
var _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9hYmNhdWRpdHMuZnBhZC5pby9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkFCQyBBdWRpdHMiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiI2ZGQ5MzBhNS0xOGFlLTQ4NTUtOWQxZS0zYTNhNmIwZTI0MjEiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzc3MzQ3MX0.MLa71XE-Gqp4uULdYudPN5VgI8rznpKESl3gG-8wLn1MIbY9TZQ4Zit5BxwTNmsyergzbKFOTQnxf2aOXWlpa9Wnn5JqCUUyiOLSQy7p0fqN5pbFzAMi97kegbXnl7Nb6O2qlmuof9YwkYCULuybhqA9AUxtrtXHf5hF0Kun-CM
`.trim()
var _devtoolsPort = 8585;
var _fpadDomains = [
  {
    displayText: 'ABC Audits',
    url: 'https://api.abcaudits.fpad.io'
  }
];

if (process.env.NODE_ENV !== 'production') {
  //DEV values
  _domain = 'http://localhost:3000/oauth2/redirect.html';

  _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkFCQyBBdWRpdHMiLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiI1NWIzOTE1Ny1lMGEyLTQwOGMtYmFjNC0wNjdkNmQ2MzA5OTciLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzc3MzUwNX0.poepSZWYxOfb6n3Dd-s5HESeQXtDlgicAjL1ZZu0r_RCXwxmjaATmpi-9tjail3zfz7fguPIOBgHc0Cre30oDe2lBDnEha4oiIerwwaJm59v2lon25_sDhKjCmpPC-G0OZ1QExu5cWkoJWSP_k0HYMNungdJWWFXdwlMW2TeF1w
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

if (process.env.NODE_ENV === 'prod-dev') {
  //DEV values
  _domain = 'http://abcaudits.fpad.io:8080/oauth2/redirect.html';

  _metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9hYmNhdWRpdHMuZnBhZC5pbzo4MDgwL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiQUJDIEF1ZGl0cyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6ImY1MTIyMzI1LTMyYTEtNGZmNC05ZDdhLWQ4N2QwOGExNDI4MyIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3NzczNDQ1fQ.D6fQ4oMm8raoLJcC-KFUAVsNmmpreOjGmQfdo9jEJ5Cuz95NIuAenssULHGAIJfsgm24vZfQhFwqVfSQbpDU4VjrAmV5zaK3xnZr7FufaFvX62LbpzJsP3vRnt_pbQZFPvJ-LxI13kcLdHsYCrXi_819_Dxh_HpdtEgR-bY1lI4
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
