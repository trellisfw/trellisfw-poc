import { unset, set } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import { sequence } from 'cerebral'
import { metadata, redirect, oadaDomain } from '../../../config';
import oada from '@oada/cerebral-module/sequences';
import * as app from '../../../modules/app/sequences';


export const fetch = sequence('user_profile.fetch', [
  ({state, props}) => ({
    path: '/users/me',
    tree: undefined,
    watch: undefined
  }),
  oada.get,
  set(state`user_profile.user`, props`responses.0.data`),
])

export const initialize = sequence('user_profile.initialize', [
  oada.connect,
  set(state`user_profile.connection_id`, props`connection_id`),
  fetch
])

export const signInClicked = sequence('user_profile.signInClicked', [
//app.initialize,
])

// TODO: fix this, run some actions, maybe init. Call signal??
export const signOutClicked = sequence('user_profile.signOutClicked', [
  unset(state`user_profile.user`),
  oadaLogOut,
  oada.disconnect
])

function oadaLogOut({state, props}) {
	let domain = state.get('oada_domain')
	// Make dummy image to go to /oadaauth/logout without using a window
	// eslint-disable-next-line
	let img = (new Image()).src = domain+"/oadaauth/logout";
}
