import { unset, set } from 'cerebral/operators'
import {state} from 'cerebral/tags'
import {oadaDomain} from '../../../config';

function signOutOfOADA({websocket}) {
  websocket.close();
  (new Image()).src = oadaDomain+"/oadaauth/logout";
}

export default [
  signOutOfOADA,
  unset(state`UserProfile.user`),
  set(state`App.model.certifications`, {}),
  set(state`Connections.connections`, {})
]
