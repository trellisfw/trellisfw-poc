function fpadDomainChanged ({state, props}) {
  state.set(`Login.fpadDomain`, props.domain)
}
export default fpadDomainChanged;
