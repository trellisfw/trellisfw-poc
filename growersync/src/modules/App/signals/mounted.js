import watchCertifications from '../../Certifications/actions/watchCertifications';
import loadCertifications from '../../Certifications/actions/loadCertifications';
import loadConnections from '../../Connections/actions/loadConnections';
import watchConnections from '../../Connections/actions/watchConnections';
import configureWebsocketProvider from '../actions/configureWebsocketProvider';
import initFpadResource from '../actions/initFpadResource';

function isLoggedIn ({state, path}) {
  let user = state.get('UserProfile.user');
  if (user == null) return path.no();
  return path.yes();
}

export default [
    isLoggedIn, {
      yes: [
        configureWebsocketProvider,
        initFpadResource,
        watchCertifications,
        loadCertifications,
        watchConnections,
        loadConnections
      ],
      no: []
    }
]
