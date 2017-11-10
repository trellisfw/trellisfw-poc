import _ from 'lodash';
import {debounce} from 'cerebral/operators'
import loadCertificationsByIds from '../actions/loadCertificationsByIds'
import removeCertificationsFromState from '../actions/removeCertificationsFromState'
import moment from 'moment';

function certificationsChanged ({props, path, state}) {
  if (props.response.merge) {
    if (_.get(props.response.merge, '_meta._permissions') != null) {
      //TODO reload the meta
    }
    //Get all the ids of the certifications that have updated revs
    let certIds = _.filter(Object.keys(props.response.merge), key=>(_.startsWith(key, '_')===false));

    //TODO remove this HACK after alex fixes smoosh
    if (certIds.length > 1) return path.merge({ids: []});

    return path.merge({ids: certIds});
  } else if (props.response.delete) {
    //Get all the ids of the certifications that have been deleted
    let certIds = _.filter(Object.keys(props.response.delete), key=>(_.startsWith(key, '_')===false));
    return path.delete({ids: certIds});
  }
  return path.unknown();
}
function gatherChanges({props, state}) {
  _.forEach(props.ids, (key) => {
    if (state.get('Certifications.pendingChanges.'+key) == null) {
      state.set('Certifications.pendingChanges.'+key, key);
    }
  });
  return {};
}
function executeChanges({state}) {
  var certIds = _.values(state.get('Certifications.pendingChanges') || {});
  state.set('Certifications.pendingChanges', {});
  return {ids: certIds};
}
function incrementCertificationCounters({props, state}) {
  //Add these certs to first connection in list
  let firstKey = Object.keys(state.get('Connections.connections'))[0];
  if (firstKey != null) {
    let receivedCount = state.get('Connections.connections.'+firstKey+'.receivedCount') || 0;
    receivedCount = receivedCount + props.ids.length;
    state.set('Connections.connections.'+firstKey+'.receivedCount', receivedCount);
    state.set('Connections.connections.'+firstKey+'.lastUpdate', parseInt(moment().format('X'), 10));
  }
}
function notifyOfNewCertifications({props, state}) {
  let currentCerts = _.keys(state.get('App.model.certifications'));
  let newCertsCount = _.difference(props.ids, currentCerts).length;
  if (newCertsCount > 0) {
    let message = 'Received 1 new certification.';
    if (newCertsCount > 1) {
      message = 'Received ' + newCertsCount + ' new certifications.';
    }
    state.set('App.view.snackBar', {open: true, message: message})
  }
}
export default [
  certificationsChanged,
  {
		merge: [
      debounce(500),
      {
        continue: [
          gatherChanges,
          executeChanges,
          notifyOfNewCertifications,
          incrementCertificationCounters,
          loadCertificationsByIds
        ],
        discard: [
          gatherChanges
        ]
      }
    ],
		delete: [
      removeCertificationsFromState
    ],
    unknown: []
	}
];
