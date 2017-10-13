const modes = ['connections', 'certifications'];
function changeModeFactory (mode) {
  if (modes.includes(mode) === false) {
    throw Error('Invaild View "'+mode+'" for TopBar/factories/changeMode');
  }
  function ChangeMode ({state}) {
    state.set('TopBar.mode', mode);
  }
  return ChangeMode
}

export default changeModeFactory;
