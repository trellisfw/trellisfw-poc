import watchCertifications from '../../Certifications/actions/watchCertifications';
import loadCertifications from '../../Certifications/actions/loadCertifications';
import loadConnections from '../../Connections/actions/loadConnections';
import watchConnections from '../../Connections/actions/watchConnections';
import loadAuthorizedApps from '../../Connections/actions/loadAuthorizedApps';
import configureWebsocketProvider from '../actions/configureWebsocketProvider';
import initTrellisfwResource from '../actions/initTrellisfwResource';
import { equals } from 'cerebral/operators'
import {props} from 'cerebral/tags'

export default [
  configureWebsocketProvider,
  initTrellisfwResource,
  equals(props`error`), {
    true: [],
    otherwise: [
      watchCertifications,
      loadCertifications,
      watchConnections,
      loadConnections,
      loadAuthorizedApps
    ]
  }
]
