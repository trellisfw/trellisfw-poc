import changeMode from './factories/changeMode';
import { sequence } from 'cerebral'
import { loadAuthorizedApps } from '../Connections/sequences';

function modeSelected ({props}) {
  changeMode(props.mode).apply(this, arguments);
}

function isLoggedIn ({state, path, props}) {
  let user = state.get('UserProfile.user');
  if (user == null || props.mode !== 'connections') return path.no();
  return path.yes();
}

export const modeClicked = sequence('modeClicked', [
  modeSelected,
  isLoggedIn, {
    yes: [
      loadAuthorizedApps
    ],
    no: []
  }
])
