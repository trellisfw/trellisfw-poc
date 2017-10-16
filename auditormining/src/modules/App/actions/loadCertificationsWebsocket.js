import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import _ from 'lodash';
import watchCertifications from './watchCertifications';

function loadCertificationsWebsocket({state, path, websocket}) {
  //Get the certifications list
  let certifications = {};
  return websocket.http({
      method: 'GET',
      url: '/bookmarks/fpad/certifications',
      headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
    }).then((res) => {
      //Extract only list of certification ids
      if (res.status !== 200) throw res;
      let certKeys = _.filter(_.keys(res.data), key=>(_.startsWith(key, '_')===false));
      return Promise.map(certKeys, (key) => {
        //Load the certifications
        return websocket.http({
            method: 'GET',
            url: '/bookmarks/fpad/certifications/'+key+'/audit',
            headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
				}).then((res) => {
						console.log(res)
            certifications[key] = res.data;
          });
      }, {concurrency: 5});
    }).then(() => {
      return path.success({certifications});
    }).catch((error) => {
      return path.error({error: error});
    });
}

export default [
  watchCertifications,
	loadCertificationsWebsocket, {
		success: [
      set(state`App.model.certifications`, props`certifications`),
    ],
		error: [],
	}
]
