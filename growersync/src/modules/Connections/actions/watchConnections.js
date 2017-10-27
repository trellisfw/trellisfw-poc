/*
  Create /bookmarks/fpad/connections if it doesn't exist, then watch
*/
import {sequence} from 'cerebral'
import doesResourceExist from '../../OADA/factories/doesResourceExist';
import createResource from '../../OADA/factories/createResource';

function watchConnections({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/fpad/connections',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }, 'Connections.connectionsChanged');
}

export default sequence('watchConnections', [
  doesResourceExist({path: '/bookmarks/fpad/connections'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/fpad/connections',
        contentType: 'application/vnd.fpad.connection.1+json'
      })
    ]
  },
  watchConnections
])
