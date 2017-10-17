import changeMode from '../factories/changeMode';

function modeSelected ({props}) {
  changeMode(props.mode).apply(this, arguments);
}
export default modeSelected;
