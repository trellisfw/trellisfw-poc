/*

Add a connection to state. But don't 'connect' it yet.

*/
import { merge } from 'cerebral/operators'

const uuidv4 = require('uuid/v4');

function changeDomain ({state, props}) {
  state.set(`connections.newConnections.${props.id}.domain`, props.domain)
}
export default changeDomain;
