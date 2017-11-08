import {sequence} from 'cerebral'
import get from '../../OADA/factories/get';
import _ from 'lodash';

function parseConnections({props, state}) {
  //Add connections to state
  _.map(props.response.data, (connection, key) => {
    if (_.startsWith(key, '_') === false) state.set(`Connections.connections.${key}`, connection);
  });
}

function loadConnections({path}) {
  return get.func(arguments)({path: '/bookmarks/trellisfw/connections'}).then(({response}) => {
    return path.success({response});
  }).catch((error) => {
    return path.error({error});
  });
}

export default sequence('loadConnections', [
  loadConnections,
  {
    success: [
      parseConnections
    ],
    error: []
  }
]);
