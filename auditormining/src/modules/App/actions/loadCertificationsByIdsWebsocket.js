import Promise from 'bluebird';

function loadCertificationsByIdsWebsocket({state, props, path, websocket}) {
  //Get the certifications with the props.ids and merge them into state
  return Promise.map(props.ids, (key) => {
    //Load the certifications
    return websocket.http({
        method: 'GET',
        url: '/bookmarks/fpad/certifications/'+key+'/audit',
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
	loadCertificationsByIdsWebsocket
]
