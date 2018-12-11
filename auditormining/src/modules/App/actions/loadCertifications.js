import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import _ from 'lodash';

import watchCertifications from './watchCertifications';

function loadCertifications({state, path}) {
  //Get the certifications list
  let certifications = {};
  const trellisfwDomain = state.get('Login.trellisfwDomain');
  return axios({
      method: 'GET',
      url: trellisfwDomain+'/bookmarks/trellisfw/certifications',
      headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
    }).then((res) => {
      //Extract only list of certification ids
      let certKeys = _.filter(Object.keys(res.data), key=>(_.startsWith(key, '_')===false));
      return Promise.map(certKeys, (key) => {
        //Load the certifications
        return axios({
            method: 'GET',
            url: trellisfwDomain+'/bookmarks/trellisfw/certifications/'+key+'/audit',
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
  watchCertifications,
	loadCertifications, {
		success: [
      set(state`App.model.certifications`, props`certifications`),
    ],
		error: [],
	},
]
