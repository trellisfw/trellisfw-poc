import _ from 'lodash';

import loadCertificationsByIds from '../actions/loadCertificationsByIds'
import removeCertificationsFromState from '../actions/removeCertificationsFromState'

function certificationsChanged ({props, path}) {
  if (props.response.merge) {
    //Get all the ids of the certifications that have updated revs
    let certIds = _.filter(Object.keys(props.response.merge), key=>(_.startsWith(key, '_')===false));
    return path.merge({ids: certIds});
  } else if (props.response.delete) {
    //Get all the ids of the certifications that have been deleted
    let certIds = _.filter(Object.keys(props.response.delete), key=>(_.startsWith(key, '_')===false));
    return path.delete({ids: certIds});
  }
  return path.unknown();
}

/*function notifyOfNewCertifications({props, state}) {
  let currentCerts = _.keys(state.get('App.model.certifications'));
  let newCertsCount = _.difference(props.ids, currentCerts).length;
  if (newCertsCount > 0) {
    let message = 'Received 1 new certification.';
    if (newCertsCount > 1) {
      message = 'Received ' + newCertsCount + ' new certifications.';
    }
    state.set('App.view.snackBar', {open: true, message: message})
  }
}*/

export default [
  certificationsChanged,
  {
		merge: [
      //notifyOfNewCertifications,
      loadCertificationsByIds
    ],
		delete: [
      removeCertificationsFromState
    ],
    unknown: []
	}
];
