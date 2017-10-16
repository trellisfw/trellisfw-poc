import { unset, set } from 'cerebral/operators'
import {state} from 'cerebral/tags'
import {oadaDomain} from '../../../config';

function signOutOfOADA() {
  var win = window.open(oadaDomain+'/oadaauth/logout',null,"top=0,left=0,height=100,width=100,status=no,toolbar=no,scrollbars=no,menubar=no,location=no");
  win.close();
}

export default [
  signOutOfOADA,
  unset(state`UserProfile.user`),
  set(state`App.view.certifications`, {}),
]
