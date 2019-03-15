import _ from 'lodash';

import loadConnectionsByIds from '../actions/loadConnectionsByIds'
import removeConnectionsFromState from '../actions/removeConnectionsFromState'

function connectionsChanged ({props, path}) {
  console.log('connectionsChanged', props)
  if (props.response.change) {
    if (props.response.change.type == "merge") {
      //Get all the ids of the certifications that have updated revs
      let ids = _.filter(Object.keys(props.response.change.body), key=>(_.startsWith(key, '_')===false));
      return path.merge({ids});
    } else if (props.response.change.type == "delete") {
      //Get all the ids of the certifications that have been deleted
      let ids = _.filter(Object.keys(props.response.change.body), key=>(_.startsWith(key, '_')===false));
      return path.delete({ids});
    }
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
