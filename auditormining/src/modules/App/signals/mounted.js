import loadCertificationsWebsocket from '../actions/loadCertificationsWebsocket';
import configureWebsocketProvider from '../../Login/actions/configureWebsocketProvider';
import changePage from '../factories/changePage';

function isLoggedIn ({state, path}) {
  let user = state.get('UserProfile.user');
  if (user == null) return path.no();
  return path.yes();
}

export default [
  isLoggedIn, {
    yes: [
      changePage('auditors'),
      configureWebsocketProvider,
      loadCertificationsWebsocket
    ],
    no: []
  }
];
