function showErrorFactory ({title, desc, error}) {
  function ShowError ({state, resolve}) {
    state.set('Error.open', true);
    state.set('Error.title', resolve.value(title));
    state.set('Error.desc', resolve.value(desc));
    let err = resolve.value(error);
    if (err) {
      state.set('Error.error', err);
    }
  }
  return ShowError
}
export default showErrorFactory;
