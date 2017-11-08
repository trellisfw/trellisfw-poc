/*
  Create /bookmarks/trellisfw/connections if it doesn't exist, then watch
*/
import {sequence} from 'cerebral'
import doesResourceExist from '../../OADA/factories/doesResourceExist';
import createResource from '../../OADA/factories/createResource';

function watchConnections({state, websocket}) {
  return websocket.watch({
    url: '/bookmarks/trellisfw/connections',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }, 'Connections.connectionsChanged');
}

export default sequence('watchConnections', [
  doesResourceExist({path: '/bookmarks/trellisfw/connections'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/trellisfw/connections',
        contentType: 'application/vnd.trellisfw.connection.1+json'
      })
    ]
  },
  watchConnections
])
