function trellisfwDomainChanged ({state, props}) {
  state.set(`Login.trellisfwDomain`, props.domain)
}
export default trellisfwDomainChanged;
