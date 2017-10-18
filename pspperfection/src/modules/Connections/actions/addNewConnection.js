/*

Add a connection to state. But don't 'connect' it yet.

*/
import {defaultNewConnectionURL} from '../../../config';
const uuidv4 = require('uuid/v4');

function addConnectionClicked ({state}) {
  state.set(`Connections.newConnections.${uuidv4()}`, {domain: defaultNewConnectionURL})
}
export default addConnectionClicked;
