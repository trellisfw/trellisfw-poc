/*

Add a connection to state. But don't 'connect' it yet.

*/
import { merge } from 'cerebral/operators'

const uuidv4 = require('uuid/v4');

function addConnectionClicked ({state}) {
  state.set(`connections.newConnections.${uuidv4()}`, {domain: ''})
}
export default addConnectionClicked;
