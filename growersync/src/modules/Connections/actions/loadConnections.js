import get from '../../OADA/factories/get';
import _ from 'lodash';

function parseConnections({props, state}) {
  //Add connections to state
  _.map(props.response.data, (connection, key) => {
    if (_.startsWith(key, '_') === false) state.set(`Connections.connections.${key}`, connection);
  });
}

export default [
  get({path: '/bookmarks/fpad/connections'}),
  {
    success: [
      parseConnections
    ],
    error: []
  }
]
