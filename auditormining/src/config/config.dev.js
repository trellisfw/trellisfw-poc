//Local Development Values
const devtoolsPort = 8585;
const oadaDomain = process.env.REACT_APP_OADA_DOMAIN || 'https://localhost'
const oadaDomains = [
  {
    displayText: 'localhost',
   url: 'https://localhost'
  },
  {
    displayText: 'AbcAudits',
    url: 'https://api.abcaudits.trellisfw.io'
  },
  {
    displayText: 'GrowerSync',
    url: 'https://api.growersync.trellisfw.io'
  },
  {
    displayText: 'PspPerfection',
    url: 'https://api.pspperfection.trellisfw.io'
  },
  {
    displayText: 'DistributingExcellence',
    url: 'https://api.distributingexcellence.trellisfw.io'
  },
  {
    displayText: 'RetailFresh',
    url: 'https://api.retailfresh.trellisfw.io'
  },
  {
   displayText: 'vip3',
  url: 'https://vip3.ecn.purdue.edu'
  },
];
const websiteDomain = 'http://localhost:'+parseInt(window.location.port, 10);
const metadata = require('./dev_metadata.js')
/*`
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMi9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMy9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNC9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNS9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNi9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwNy9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwOC9vYXV0aDIvcmVkaXJlY3QuaHRtbCIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwOS9vYXV0aDIvcmVkaXJlY3QuaHRtbCJdLCJ0b2tlbl9lbmRwb2ludF9hdXRoX21ldGhvZCI6InVybjppZXRmOnBhcmFtczpvYXV0aDpjbGllbnQtYXNzZXJ0aW9uLXR5cGU6and0LWJlYXJlciIsImdyYW50X3R5cGVzIjpbImltcGxpY2l0Il0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiaWRfdG9rZW4iLCJpZF90b2tlbiB0b2tlbiJdLCJjbGllbnRfbmFtZSI6IkF1ZGl0b3JNaW5pbmciLCJjbGllbnRfdXJpIjoiaHR0cHM6Ly9mcGFkLmlvLyIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiJlZDg3NTFjMC04NDFmLTQ0NTctOTFiZS00MmRiOWE5Mjg1ZmUiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUwNzg5ODkwNH0.O2GK6rY-0PN5CIDPSl1UUzartzdkYq_jjXIYi9O4pvzp9QHSaLTKYQgTVduE4GFi57s3kYT12DW_aggjGNT7i62VS4OIZkW_saygtLFbNbRtnR1Mb2X5CKIBSzeUToO3K4nOQ_689xl0IVMb1EAVsFTm9np_zwIcFwuh6TJx-Ug
`.trim()*/

export default {
	oadaDomain,
  oadaDomains,
  devtoolsPort,
  websiteDomain,
  metadata
}
