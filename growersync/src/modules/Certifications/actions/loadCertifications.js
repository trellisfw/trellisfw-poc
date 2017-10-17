import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import _ from 'lodash';

import get from '../../OADA/factories/get';
/*
  Load certifications
*/
function loadCertifications({path, state}) {
  //Get the certifications list
  let certifications = {};
  return get.func(arguments)({path: '/bookmarks/fpad/certifications'}).then(({response}) => {
    //Extract only list of certification ids
    let certKeys = _.filter(Object.keys(response.data), key=>(_.startsWith(key, '_')===false));
    return Promise.map(certKeys, (key) => {
      //Load the certifications
      return get.func(arguments)({path: '/bookmarks/fpad/certifications/'+key+'/audit'}).then(({response}) => {
        certifications[key] = response.data;
      }).catch((err) => {
        console.log('Error. Failed to load certification', key);
      });
    }, {concurrency: 5});
  }).then(() => {
    return path.success({certifications});
  }).catch((error) => {
    return path.error({error});
  });
}

export default [
	loadCertifications, {
		success: [
      set(state`App.model.certifications`, props`certifications`),
    ],
		error: [],
    missing: []
	},
]
