import {oadaDomain} from '../../config';
import Promise from 'bluebird';
import {sequence} from 'cerebral'
import { equals, when, set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import doesResourceExist from '../OADA/factories/doesResourceExist';
import createResource from '../OADA/factories/createResource';
import showError from '../Error/factories/showError'
import { loadCertifications, watchCertifications } from '../Certifications/sequences';
import {loadAuthorizedApps, watchConnections, loadConnections } from '../Connections/sequences';

export const initTrellisResource = sequence('initTrellisResource', [
  doesResourceExist({path: '/bookmarks/trellis'}),
  {
    yes: [],
    no: [
      createResource({
        path: '/bookmarks/trellis',
        contentType: 'application/vnd.trellis.1+json'
      })
    ],
    error: [
      showError({title: 'Error', desc: 'Failed to login.', error: props`error.message`}),
      set(props`error`, true)
    ]
  }
])

export const initialize = sequence('initialize', [
  configureWebsocketProvider,
  initTrellisResource,
  equals(props`error`), {
    true: [],
    otherwise: [
      watchCertifications,
      loadCertifications,
      watchConnections,
      loadConnections,
      loadAuthorizedApps
    ]
  }
])

export const mounted = sequence('mounted', [
    when(state`user_profile.user`), {
      true: [
        initialize
      ],
      false: []
    }
])

export function configureWebsocketProvider ({websocket, state}) {
  return Promise.resolve().then(() => {
    if (websocket == null) throw new Error('Websocket provider is undefined. Please add it to your controller.')
    return websocket.configure({url: oadaDomain});
  })
}

