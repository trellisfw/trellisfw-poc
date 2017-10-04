/*

Add a connection to state. But don't 'connect' it yet.

*/
const uuidv4 = require('uuid/v4');

function addConnectionClicked ({state}) {
  state.set(`Connections.newConnections.${uuidv4()}`, {domain: 'https://abcaudits.fpad.io'})
}
export default addConnectionClicked;
