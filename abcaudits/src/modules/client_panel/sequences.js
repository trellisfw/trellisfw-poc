import { set, unset, when, toggle } from 'cerebral/operators';
import {state, props } from 'cerebral/tags';
import { sequence } from 'cerebral';
import Promise from 'bluebird';
import uuid from 'uuid';
import * as oada from '@oada/cerebral-module/sequences';

var tree = {
  bookmarks: {
    _type: 'application/vnd.oada.bookmarks.1+json',
    _rev: '0-0',
    trellis: {
      _type: 'application/vnd.trellis.1+json',
      _rev: '0-0',
      clients: {
        _type: 'application/vnd.trellis.clients.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellis.client.1+json',
          _rev: '0-0',
          certifications: {
            _type: 'application/vnd.trellis.certifications.1+json',
            _rev: '0-0',
            '*': {
              _type: 'application/vnd.trellis.certification.globalgap.1+json',
              _rev: '0-0',
              audit: {
                _type: 'application/vnd.trellis.audit.globalgap.1+json',
                _rev: '0-0',
              },
              certificate: {
                _type: 'application/vnd.trellis.certificate.1+json',
                _rev: '0-0',
              }
            }
          }
        }
      }
    }
  }
}

export const mapTrellisToRecords = sequence('client_panel.mapTrellisToRecords', [
  ({state, props}) => {
    var connection_id = state.get(`client_panel.connection_id`);
    var clients = state.get(`oada.${connection_id}.bookmarks.trellis.clients`);
    return Promise.map(Object.keys(clients || {}), (key) => {
      state.set(`client_panel.clients.${key}`, clients[key]);
    }).then(() => {
      return
    })
  }
])

export const fetch = sequence('client_panel.fetch', [
  ({state, props}) => ({
    path: '/bookmarks/trellis/clients',
    tree,
    watch: {
      signals: ['client_panel.mapTrellisToRecords'],
    },
    connection_id: state.get(`client_panel.connection_id`),
  }),
  oada.get,
  mapTrellisToRecords,
])

export const initialize = sequence('client_panel.initialize', [
  oada.connect,
  set(state`client_panel.connection_id`, props`connection_id`),
	when(state`user_profile.user`), {
		true: [
      set(props`token`, state`user_profile.user.token`),
      fetch
    ],
		false: [],
	},
])

export const clientClicked = sequence('client_panel.clientClicked', [
  set(state`client_panel.selected_client`, props`id`),
])

export const clientDialogSubmitted = sequence('client_panel.clientDialogSubmitted', [
	toggle(state`client_panel.client_dialog.open`),
  set(props`text`, state`client_panel.client_dialog.text`),
  set(props`id`, uuid()),
  ({}) => {console.log(tree)},
  ({state, props}) => ({
    connection_id: state.get(`client_panel.connection_id`),
		path: '/bookmarks/trellis/clients/'+props.id,
    data: {
			name: props.text,
    },
    tree,
  }),
  oada.put,
  clientClicked,
])

export const clientDialogCancelled = sequence('client_panel.clientDialogCancelled', [
  set(state`client_panel.client_dialog.text`, ''),
  toggle(state`client_panel.client_dialog.open`),
])

export const addClientButtonClicked = sequence('client_panel.addClientButtonClicked', [
  toggle(state`client_panel.client_dialog.open`),
])

export const textChanged = sequence('client_panel.textChanged', [
  set(state`client_panel.client_dialog.text`, props`text`),
])
