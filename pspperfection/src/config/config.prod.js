//Production Values
const devtoolsPort = 8585;
const apiDomain = process.env.REACT_APP_API_DOMAIN || 'https://api.abcaudits.fpad.io';
const oadaDomain = 'https://api.growersync.fpad.io';
const websiteDomain = 'https://growersync.fpad.io';
const metadata = `
	eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9wc3BwZXJmZWN0aW9uLmZwYWQuaW8vb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJQc3BQZXJmZWN0aW9uIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vZnBhZC5pby8iLCJjb250YWN0cyI6WyJTYW0gTm9lbCA8c2Fub2VsQHB1cmR1ZS5lZHU-Il0sInNvZnR3YXJlX2lkIjoiZTMwMTkxNzktMmUwYi00ZWQxLTg2NmMtODdkZjRiMjA0MDA0IiwicmVnaXN0cmF0aW9uX3Byb3ZpZGVyIjoiaHR0cHM6Ly9pZGVudGl0eS5vYWRhLWRldi5jb20iLCJpYXQiOjE1MDc4MjM1MTd9.b2HVhbTH9awjGx2b6tBhOMMxiCsVILetkpgnscUKpUBiVX8pXA3gdhXK83lzbvVdNX-UMgM1wwjQX9z0dcqQK73NmiVmMeLvin68v1Ae0jZedezsCRMrxdic5wATyXpxkH5KIWWVvH0HeuabZ4jap49cHGtr2D29_IoHLVYX5jA
`.trim()

const defaultNewConnectionURL = 'https://api.abcaudits.fpad.io';

export default {
	apiDomain,
  oadaDomain,
  devtoolsPort,
  websiteDomain,
  metadata,
  defaultNewConnectionURL
}
