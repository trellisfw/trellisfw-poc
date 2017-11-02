import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';

function loadCertificationsByIds({state, props, path}) {
  //Get the certifications with the props.ids and merge them into state
  const trellisDomain = state.get('Login.trellisDomain');
  return Promise.map(props.ids, (key) => {
    //Load the certifications
    return axios({
        method: 'GET',
        url: trellisDomain+'/bookmarks/trellisfw/certifications/'+key+'/audit',
        headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
      }).then((res) => {
        state.set('App.model.certifications.'+key, res.data);
        return {};
      });
  }, {concurrency: 5}).then(() => {
    return {};
  });
}

export default [
	loadCertificationsByIds
]
