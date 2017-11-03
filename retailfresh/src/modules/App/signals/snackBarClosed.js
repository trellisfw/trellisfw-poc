
function closeSnackBar ({state}) {
  state.set('App.view.snackBar.open', false);
}

export default [
  closeSnackBar
];
