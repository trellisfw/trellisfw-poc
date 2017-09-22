import loadCertifications from '../actions/loadCertifications';

function isLoggedIn ({state, path}) {
  let user = state.get('UserProfile.user');
  if (user == null) return path.no();
  return path.yes();
}

export default [
  isLoggedIn, {
    yes: [
      loadCertifications
    ],
    no: []
  }
];
