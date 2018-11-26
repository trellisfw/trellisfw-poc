import { sequence } from 'cerebral';
import { metadata, oadaDomain, redirect } from '../../config';
import { unset } from 'cerebral/operators'
import {state, props } from 'cerebral/tags'
import * as certifications from '../../common/modules/certifications/sequences';
import * as client_panel from '../../modules/client_panel/sequences';
import * as oada from '@oada/cerebral-module/sequences'

export const closeViewerClicked = sequence('closeViewerClicked', [
	unset(state`view.certifications.${props`name`}.cert_viewer`)
])

export const certViewerClicked = sequence('certViewerClicked', [
	showDoc,
])

function showDoc({state, props}) {
	state.set(`view.certifications.${props.name}.cert_viewer`, {
		doc: props.doc, 
		expanded: ''
	})
}

export const initialize = sequence('initialize', [
  ({state, props}) => ({
    domain: oadaDomain,
    options: {
      redirect,
      metadata,
      scope: 'trellis:all'
    }
  }),
  certifications.initialize,
  client_panel.initialize,
])
