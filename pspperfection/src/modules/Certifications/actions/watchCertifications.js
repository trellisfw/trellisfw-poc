/*
  Create /bookmarks/trellisfw/certifications if it doesn't exist, then watch
*/
import {sequence} from 'cerebral'
import doesResourceExist from '../../OADA/factories/doesResourceExist';
import createResource from '../../OADA/factories/createResource';

function watchCertifications({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/trellisfw/certifications',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }, 'Certifications.certificationsChanged');
}

export default sequence('watchCertifications', [
  doesResourceExist({path: '/bookmarks/trellisfw/certifications'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/trellisfw/certifications',
        contentType: 'application/vnd.trellisfw.certifications.1+json'
      })
    ],
    error: []
  },
  watchCertifications
]);
