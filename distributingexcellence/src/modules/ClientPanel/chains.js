import randCert from 'fpad-rand-cert'
import { set, when, toggle } from 'cerebral/operators'
import {state, props, string, path} from 'cerebral/tags'
import _ from 'lodash'
import uuid from 'uuid';

export let submitClient = [
  set(state`client_panel.client`),
  toggle(state`client_panel.client_dialog.visible`),
]

export let cancelClient = [
  toggle(state`client_panel.client_dialog.visible`),
]

export let showClientDialog = [
  toggle(state`client_panel.client_dialog.visible`),
]

export let setClientText = [
  set(state`client_panel.client_dialog.text`, props`text`),
]

