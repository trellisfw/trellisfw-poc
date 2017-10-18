import changeMode from '../factories/changeMode';
import loadAuthorizedApps from '../../Connections/actions/loadAuthorizedApps';
function modeSelected ({props}) {
  changeMode(props.mode).apply(this, arguments);
}

function isLoggedIn ({state, path, props}) {
  let user = state.get('UserProfile.user');
  if (user == null || props.mode !== 'connections') return path.no();
  return path.yes();
}

export default [
  modeSelected,
  isLoggedIn, {
    yes: [
      loadAuthorizedApps
    ],
    no: []
  }
];
