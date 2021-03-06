import Promise from 'bluebird';
import {sequence} from 'cerebral'
import get from '../../OADA/factories/get';

function loadCertificationsByIds({state, props, path, websocket}) {
  //Get the connections with the props.ids and merge them into state
  return Promise.map(props.ids, (key) => {
    //Load the connections
    return get.func(arguments)({
      path: '/bookmarks/fpad/certifications/'+key+'/audit'
    }).then(({response}) => {
      state.set('App.model.certifications.'+key, response.data);
    }).catch((err) => {
      console.log('Error. Failed to load certification', key);
    });
  }, {concurrency: 5}).then(() => {
    return {};
  });
}

export default sequence('loadCertificationsByIds', [
	loadCertificationsByIds
])
