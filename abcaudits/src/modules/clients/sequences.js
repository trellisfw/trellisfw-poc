import { set, unset, when, toggle } from 'cerebral/operators';
import _ from 'lodash';
import {state, props } from 'cerebral/tags';
import { parallel, sequence } from 'cerebral';
import Promise from 'bluebird';
import uuid from 'uuid';
import oada from '@oada/cerebral-module/sequences';
import * as certifications from '../../common/modules/certifications/sequences';
import * as sharing_dialog from '../../common/modules/sharing_dialog/sequences';
import * as user_profile from '../../common/modules/user_profile/sequences';
Promise.config({warnings: false})

var tree = {
  bookmarks: {
    _type: 'application/vnd.oada.bookmarks.1+json',
    _rev: '0-0',
    trellisfw: {
      _type: 'application/vnd.trellisfw.1+json',
      _rev: '0-0',
      clients: {
        _type: 'application/vnd.trellisfw.clients.1+json',
        _rev: '0-0',
        '*': {
          _type: 'application/vnd.trellisfw.client.1+json',
          _rev: '0-0',
          certifications: {
            _type: 'application/vnd.trellisfw.certifications.1+json',
            _rev: '0-0',
            '*': {
              _type: 'application/vnd.trellisfw.certification.globalgap.1+json',
              _rev: '0-0',
              audit: {
                _type: 'application/vnd.trellisfw.audit.globalgap.1+json',
                _rev: '0-0',
              },
              certificate: {
                _type: 'application/vnd.trellisfw.certificate.1+json',
                _rev: '0-0',
              }
            }
          }
        }
      }
    }
  }
}

export const signOutClicked = sequence('clients.signOutClicked', [
  set(state`clients.records`, {}),
  set(state`view.certifications`, {}),
  set(props`connection_id`, state`clients.connection_id`),
  user_profile.signOutClicked,
])

export const certChecked = sequence('certifications.certChecked', [
  set(state`view.certifications.${props`certId`}.selected`, props`checked`)
])

export const clientClicked = sequence('clients.clientClicked', [
  when(props`clientId`), {
    true: [
      ({state, props}) => {
        var certifications = state.get(`clients.records.${props.clientId}.certifications`) || {};
        state.set(`view.certifications`, certifications);
      },
      set(state`clients.selected_client`, props`clientId`),
    ],
    false: []
  }
])

export const mapTrellisToRecords = sequence('clients.mapTrellisToRecords', [
  ({state, props}) => {
    var connection_id = state.get(`clients.connection_id`);
    var clients = state.get(`oada.${connection_id}.bookmarks.trellisfw.clients`);
    state.set(`clients.records`, {});
    Object.keys(clients || {}).map((key) =>
      state.set(`clients.records.${key}`, clients[key])
    )
  },
  set(props`clientId`, state`clients.selected_client`),
  clientClicked
])

export const fetch = sequence('clients.fetch', [
  ({state, props}) => {
    // Putting meta permissions is dangerous, so just manually add it to the tree to fetch it
    var newTree = _.cloneDeep(tree);
    newTree.bookmarks.trellisfw.clients['*'].certifications._meta = {_permissions: {'*': {}}};
    return {
      requests: [
        {
          path: '/bookmarks/trellisfw/clients',
          tree: newTree,
          watch: {
            signals: ['clients.mapTrellisToRecords'],
          },
          connection_id: state.get(`clients.connection_id`),
        }
      ],
    };
  },
  oada.get,
  mapTrellisToRecords,
])

export const initialize = sequence('clients.initialize', [
  oada.connect,
  set(state`clients.connection_id`, props`connection_id`),
  fetch
])

export const clientDialogSubmitted = sequence('clients.clientDialogSubmitted', [
	toggle(state`clients.client_dialog.open`),
  set(props`text`, state`clients.client_dialog.text`),
  set(props`clientId`, uuid()),
  //optimistic update
  set(state`clients.records.${props`clientId`}`, {certifications: {}, name: ''}),
  set(state`clients.records.${props`clientId`}.name`, props`text`),
  ({state, props}) => ({
    requests: [
      {
        connection_id: state.get(`clients.connection_id`),
  		  path: '/bookmarks/trellisfw/clients/'+props.clientId,
        data: {
          name: props.text,
        },
        tree,
      }
    ],
  }),
  oada.put,
  clientClicked,
])

//Create an object, I need their keys as well as their values
function getSelectedCertifications({state, props}) {
  var certs = state.get(`view.certifications`);
  var certifications = {};
  return Promise.map(Object.keys(certs || {}), (key) => {
    if (certs[key].selected) certifications[key] = certs[key];
    return null;
  }).then(() => {
    return {certifications}
  })
}

function deselectCertifications({state, props}) {
  return Promise.map(Object.keys(props.certifications || {}), (key) => {
    state.unset(`view.certifications.${key}.selected`);
    return null;
  }).then(() => {return})
}

export const deleteCertsButtonClicked = sequence('clients.deleteCertsButtonClicked', [
  getSelectedCertifications,
  set(props`connection_id`, state`certifications.connection_id`),
  certifications.deleteCertifications,
  set(props`clientId`, state`clients.selected_client`),
  ({state, props}) => {
    return Promise.map(Object.keys(props.certifications), (key) => {
      //optimistic update
      state.unset(`view.certifications.${key}`);
      state.unset(`clients.records.${props.clientId}.certifications.${key}`);
      return {
        path: `/bookmarks/trellisfw/clients/${props.clientId}/certifications/${key}`,
        type: `application/vnd.trellisfw.certification.globalgap.1+json`,
      }
    }).then((requests) => {
      return {requests};
    })
  },
  oada.delete
])

// Now link to clients index
export const createClientCert = sequence('clients.createClientCert', [
  //Optimistic update
  set(state`view.certifications.${props`certId`}`, props`certification`),
  set(props`connection_id`, state`clients.connection_id`),
  ({state, props}) => ({
    path: `/bookmarks/trellisfw/clients/${props.clientId}/certifications/${props.certId}`,
    data: {_id: 'resources/'+props.certId, _rev: '0-0'},
    tree
  }),
  oada.put,
  oada.get,
  set(state`view.certifications.${props`certId`}`, props`certification`),
  mapTrellisToRecords,
])

export const addCertButtonClicked = sequence('clients.addCertButtonClicked', [
  set(props`clientId`, state`clients.selected_client`),
  set(props`clientName`, state`clients.records.${props`clientId`}.name`),
  certifications.generateRandomCertification,
  certifications.createCertification,
  createClientCert
])

export const updateCertButtonClicked = sequence('clients.updateCertButtonClicked', [
  set(props`clientId`, state`clients.selected_client`),
  set(props`clientName`, state`clients.records.${props`selected_client`}.name`),
  set(props`connection_id`, state`clients.connection_id`),
  getSelectedCertifications,
  certifications.updateCerts,
  //optimistically do this
  deselectCertifications,
  ({state, props}) => {
    return Promise.map(Object.keys(props.certifications || {}), (key) => {
      //optimist update
      state.set(`view.certifications.${key}.audit`, props.certifications[key].audit);
      return {
        path: `/bookmarks/trellisfw/clients/${props.clientId}/certifications/${key}/audit`,
        data: props.certifications[key].audit,
        tree,
      }
    }).then((requests) => {
      return {requests};
    })
  },
  oada.put,
])

export const signAuditButtonClicked = sequence('clients.signAuditButtonClicked', [
  set(props`clientId`, state`clients.selected_client`),
  set(props`clientName`, state`clients.records.${props`selected_client`}.name`),
  certifications.generateAuditSignature,
  ({state, props}) => ({
    connection_id: state.get(`clients.connection_id`),
    path: `/bookmarks/trellisfw/clients/${props.clientId}/certifications/${props.certId}/audit`,
    data: {signatures: props.signature},
    tree,
  }),
  oada.put,
])

export const clientDialogCancelled = sequence('clients.clientDialogCancelled', [
  set(state`clients.client_dialog.text`, ''),
  toggle(state`clients.client_dialog.open`),
])

export const addClientButtonClicked = sequence('clients.addClientButtonClicked', [
  toggle(state`clients.client_dialog.open`),
])

export const textChanged = sequence('clients.textChanged', [
  set(state`clients.client_dialog.text`, props`text`),
])
