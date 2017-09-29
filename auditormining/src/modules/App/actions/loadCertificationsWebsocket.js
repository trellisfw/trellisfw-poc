import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import _ from 'lodash';

function loadCertificationsWebsocket({state, path, websocket}) {
  //Get the certifications list
  let certifications = {};
  return websocket.http({
      method: 'GET',
      url: '/bookmarks/fpad/certifications',
      headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
    }).then((res) => {
      //Extract only list of certification ids
      let certKeys = _.filter(Object.keys(res.data), key=>(_.startsWith(key, '_')===false));
      return Promise.map(certKeys, (key) => {
        //Load the certifications
        return websocket.http({
            method: 'GET',
            url: '/bookmarks/fpad/certifications/'+key,
            headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
          }).then((res) => {
            certifications[key] = res.data;
          });
      }, {concurrency: 5});
    }).then(() => {
      return path.success({certifications});
    }).catch((error) => {
      return path.error({error});
    });
}

export default [
	loadCertificationsWebsocket, {
		success: [
      set(state`App.model.certifications`, props`certifications`),
    ],
		error: [],
	},
]
