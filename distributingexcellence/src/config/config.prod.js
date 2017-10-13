//Production Values
const devtoolsPort = 8585;
const apiDomain = process.env.REACT_APP_API_DOMAIN || 'https://api.abcaudits.fpad.io';
const oadaDomain = 'https://api.growersync.fpad.io';
const websiteDomain = 'https://growersync.fpad.io';
const metadata = `
eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHBzOi8vZGlzdHJpYnV0aW5nZXhjZWxsZW5jZS5mcGFkLmlvL29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiaW1wbGljaXQiXSwicmVzcG9uc2VfdHlwZXMiOlsidG9rZW4iLCJpZF90b2tlbiIsImlkX3Rva2VuIHRva2VuIl0sImNsaWVudF9uYW1lIjoiRGlzdHJpYnV0aW5nRXhjZWxsZW5jZSIsImNsaWVudF91cmkiOiJodHRwczovL2ZwYWQuaW8vIiwiY29udGFjdHMiOlsiU2FtIE5vZWwgPHNhbm9lbEBwdXJkdWUuZWR1PiJdLCJzb2Z0d2FyZV9pZCI6ImY5OWI1NTY3LTkxNGYtNDI0Ni05YTYzLTk0NWViMTZiNjdmYyIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTA3ODI3OTI1fQ.IVfhu1OvsnT4RrUaPs9ftHDw1bKXOTvQ4FfKD_E_IzLIELoyD9_H2zIgaCsEY849cKVpJOfukEBYo5g5hBWpZGZVboZkznugI-c-eTdc4y5Cfx-0QuJYKUde76cOtGGeLY289t0ZlaXyNVnzIseB5HJkCy2veqSJ6kTOwJgP4XE
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
