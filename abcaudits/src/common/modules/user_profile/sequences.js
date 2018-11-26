import { unset, set } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import { sequence } from 'cerebral'
import { metadata, redirect, oadaDomain } from '../../../config';
import * as oada from '@oada/cerebral-module/sequences';

export const signInClicked = sequence('user_profile.signInClicked', [
  ({state, props}) => ({
    domain: oadaDomain,
    options: {
		  metadata,
      scope: 'trellis:all',
      redirect,
    },
  }),
  oada.connect,
  ({state, props}) => ({
    path: '/users/me',
  }),
  oada.get,
  set(state`user_profile.user`, props`response.data`),
])

// TODO: fix this, run some actions, maybe init. Call signal??
export const signOutClicked = sequence('user_profile.signOutClicked', [
  unset(state`user_profile.user`),
  set(state`client_panel.clients`, {}),
  set(state`view.certifications`, {}),
  oadaLogOut,
])

function oadaLogOut({state, props}) {
	let domain = state.get('oada_domain')
	// Make dummy image to go to /oadaauth/logout without using a window
	// eslint-disable-next-line
	let img = (new Image()).src = domain+"/oadaauth/logout";
}
