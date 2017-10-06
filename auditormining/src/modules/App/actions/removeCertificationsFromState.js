
function removeCertificationsFromState({state, props}) {
  //Get the certifications with the props.ids and merge them into state
  let keys = props.ids || [];
  keys.forEach((key) => {
    state.unset('App.model.certifications.'+key);
  });
}

export default [
	removeCertificationsFromState
]
