//Production Values
const devtoolsPort = 8585;
const oadaDomain = process.env.REACT_APP_OADA_DOMAIN || 'https://api.abcaudits.trellisfw.io';
const oadaDomains = [
  {
    displayText: 'AbcAudits',
    url: 'https://api.abcaudits.trellisfw.io'
  },
  {
    displayText: 'GrowerSync',
    url: 'https://api.growersync.trellisfw.io'
  },
];
const websiteDomain = 'https://auditormining.trellisfw.io';
const metadata = require('./prod_metadata.js');
/*`
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vYXVkaXRvcm1pbmluZy5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiQXVkaXRvck1pbmluZyIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6IjY5MGM0ZTA3LWJkNjctNGY0Zi04ZWRiLTc1YTU0YWFmMGYwNyIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI4MzE4fQ.Od10pBHJ3Hnl6WD3DKU7yfI9sw1-zN9ZAK2gEzVFRiSm38N3FoRz8KXpvWoZnbgnPHBCiIlyBstfhdit3IiVReKVD5jKJaxRc4mI00FlPgrXVhHTk421M63XiwvgFya-a1GMGWeRslB0GfNpmTSVNT1W9B6CCMN4XibATXdss7c
`.trim()*/

export default {
	oadaDomain,
  oadaDomains,
  devtoolsPort,
  websiteDomain,
  metadata
}
