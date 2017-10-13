//Local Development Values
const devtoolsPort = 8585;
const oadaDomains = [
  {
    displayText: 'localhost',
    url: 'https://localhost'
  },
  {
    displayText: 'AbcAudits',
    url: 'https://api.abcaudits.fpad.io'
  },
  {
    displayText: 'GrowerSync',
    url: 'https://api.growersync.fpad.io'
  },
  {
    displayText: 'vip3',
    url: 'https://vip3.ecn.purdue.edu'
  },
];
const websiteDomain = 'http://localhost:'+parseInt(window.location.port, 10);
const metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkF1ZGl0b3JNaW5pbmciLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIzNDAwMDVkZS1kZDdmLTRkMTQtOWZhZS0xZWVhOWZjNzdmNTUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzgyODM2Nn0.bcK9EruBRtoVjsCYXPjH5Ghx3uT9vsWiTiw6bow2YoA6UwKGTTDX_GMMrmS3m1IREcZ_1g3Zoa9C32DI-h2wBjwpzeUMDzCBUmfRv3sUUzMuTHtvYzUquBxYJnJlefKbqUXAqKg4hIpL6WaHIdj6agy5giif1oGEh8yUakTFweE
`.trim()

export default {
  oadaDomains,
  devtoolsPort,
  websiteDomain,
  metadata
}
