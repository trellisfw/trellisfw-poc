import {sequence} from 'cerebral'

function removeConnectionsFromState({state, props}) {
  let keys = props.ids || [];
  keys.forEach((key) => {
    state.unset('Connections.connections.'+key);
  });
}

export default sequence('removeConnectionsFromState', [
	removeConnectionsFromState
])
