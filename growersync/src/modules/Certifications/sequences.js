import {set, debounce} from 'cerebral/operators'
import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import Promise from 'bluebird';
import _ from 'lodash';
import get from '../OADA/factories/get';
import doesResourceExist from '../OADA/factories/doesResourceExist';
import createResource from '../OADA/factories/createResource';

function watchCerts({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/trellis/certifications',
    headers: {Authorization: 'Bearer '+ state.get('user_profile.user.token')}
  }, 'Certifications.certificationsChanged');
}

export const watchCertifications = sequence('Certifications.watchCertifications', [
  doesResourceExist({path: '/bookmarks/trellis/certifications'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/trellis/certifications',
        contentType: 'application/vnd.trellis.certifications.globalgap.1+json'
      })
    ],
  },
  watchCerts
]);

/*
  Load certifications
*/
export function loadCertifications({path, state}) {
  //Get the certifications list
  let certifications = {};
  return get.func(arguments)({path: '/bookmarks/trellis/certifications'}).then(({response}) => {
    //Extract only list of certification ids
    let certKeys = _.filter(Object.keys(response.data), key=>(_.startsWith(key, '_')===false));
    return Promise.map(certKeys, (key) => {
      //Load the certifications
      return get.func(arguments)({path: '/bookmarks/trellis/certifications/'+key+'/audit'}).then(({response}) => {
        certifications[key] = response.data;
      }).catch((err) => {
        console.log('Error. Failed to load certification', key);
      });
    }, {concurrency: 5});
  }).then(() => {
    state.set(`model.certifications`, certifications)
    return {certifications};
  }).catch((error) => {
    return
  });
}

export function removeCertificationsFromState({state, props}) {
  //Get the certifications with the props.ids and merge them into state
  let keys = props.ids || [];
  keys.forEach((key) => {
    state.unset('App.model.certifications.'+key);
  });
}


export function loadCertificationsByIds({state, props, path, websocket}) {
  //Get the connections with the props.ids and merge them into state
  return Promise.map(props.ids, (key) => {
    //Load the connections
    return get.func(arguments)({
      path: '/bookmarks/trellis/certifications/'+key+'/audit'
    }).then(({response}) => {
      state.set('App.model.certifications.'+key, response.data);
    }).catch((err) => {
      console.log('Error. Failed to load certification', key);
    });
  }, {concurrency: 5}).then(() => {
    return {};
  });
}



export const yearClicked = sequence('certifications.yearClicked', [
  set(state`Certifications.view.selectedYear`, props`year`)
]);

function certificationsChanged ({props, path, state}) {
  if (props.response.merge) {
    if (_.get(props.response.merge, '_meta._permissions') != null) {
      //TODO reload the meta
    }
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

export const certificationsChanges = sequence('certifications.certificationsChanges', [
  certificationsChanged,
  {
		merge: [
      debounce(500),
      {
        continue: [
          gatherChanges,
          executeChanges,
          //notifyOfNewCertifications,
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
]);

export const certChecked = sequence('certifications.certChecked', [
])
