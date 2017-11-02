function trellisDomainChanged ({state, props}) {
  state.set(`Login.trellisDomain`, props.domain)
}
export default trellisDomainChanged;
