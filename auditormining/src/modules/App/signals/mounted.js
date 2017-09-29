import loadCertifications from '../actions/loadCertificationsWebsocket';
import configureWebsocketProvider from '../../Login/actions/configureWebsocketProvider';

function isLoggedIn ({state, path}) {
  let user = state.get('UserProfile.user');
  if (user == null) return path.no();
  return path.yes();
}

export default [
  isLoggedIn, {
    yes: [
      configureWebsocketProvider,
      loadCertifications
    ],
    no: []
  }
];
