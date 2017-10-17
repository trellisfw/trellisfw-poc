import _ from 'lodash';

import loadConnectionsByIds from '../actions/loadConnectionsByIds'
import removeConnectionsFromState from '../actions/removeConnectionsFromState'

function connectionsChanged ({props, path}) {
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

export default [
  connectionsChanged,
  {
		merge: [
      loadConnectionsByIds
    ],
		delete: [
      removeConnectionsFromState
    ],
    unknown: []
	}
];
