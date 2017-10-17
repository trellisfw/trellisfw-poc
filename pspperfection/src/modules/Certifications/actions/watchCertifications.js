/*
  Create /bookmarks/fpad/certifications if it doesn't exist, then watch
*/
import {sequence} from 'cerebral'
import doesResourceExist from '../../OADA/factories/doesResourceExist';
import createResource from '../../OADA/factories/createResource';

function watchCertifications({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/fpad/certifications',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }, 'Certifications.certificationsChanged');
}

export default sequence('watchCertifications', [
  doesResourceExist({path: '/bookmarks/fpad/certifications'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/fpad/certifications',
        contentType: 'application/vnd.fpad.certifications.globalgap.1+json'
      })
    ],
    error: []
  },
  watchCertifications
]);
