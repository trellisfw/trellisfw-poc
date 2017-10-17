import watchCertifications from '../../Certifications/actions/watchCertifications';
import loadCertifications from '../../Certifications/actions/loadCertifications';
import loadConnections from '../../Connections/actions/loadConnections';
import watchConnections from '../../Connections/actions/watchConnections';
import configureWebsocketProvider from '../actions/configureWebsocketProvider';
import initFpadResource from '../actions/initFpadResource';

export default [
  configureWebsocketProvider,
  initFpadResource,
  watchCertifications,
  loadCertifications,
  watchConnections,
  loadConnections
]
