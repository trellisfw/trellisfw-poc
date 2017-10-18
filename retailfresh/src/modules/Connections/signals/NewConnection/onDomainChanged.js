/*

*/
function onDomainChanged ({state, props}) {
  state.set(`Connections.newConnections.${props.id}.domain`, props.domain)
}
export default onDomainChanged;
