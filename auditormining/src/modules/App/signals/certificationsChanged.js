import _ from 'lodash';

import loadCertificationsByIdsWebsocket from '../actions/loadCertificationsByIdsWebsocket'

function certificationsChanged ({props, path}) {
  if (props.response.merge) {
    //Get all the ids of the certifications that have updated revs
    let certIds = _.filter(Object.keys(props.response.merge), key=>(_.startsWith(key, '_')===false));
    return path.merge({ids: certIds});
  } else if (props.response.delete) {
    //TODO certification was deleted
    console.warn('TODO');
    return path.delete();
  }
  return path.unknown();
}

export default [
  certificationsChanged,
  {
		merge: [
      loadCertificationsByIdsWebsocket
    ],
		delete: [],
    unknown: []
	}
];
