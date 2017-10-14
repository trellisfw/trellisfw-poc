import { set } from 'cerebral/operators'
import {state, props} from 'cerebral/tags'
import Promise from 'bluebird';
import axios from 'axios';
import {oadaDomain} from '../../../config';
import _ from 'lodash';

/*
  Load certifications
    If missing:
      - add /fpad & /fpad/certifications to /bookmarks
*/
function loadCertifications({state, path}) {
  //Get the certifications list
  let certifications = {};
  return axios({
      method: 'GET',
      url: oadaDomain+'/bookmarks/fpad/certifications',
      headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
    }).then((res) => {
      //Extract only list of certification ids
      let certKeys = _.filter(Object.keys(res.data), key=>(_.startsWith(key, '_')===false));
      return Promise.map(certKeys, (key) => {
        //Load the certifications
        return axios({
            method: 'GET',
            url: oadaDomain+'/bookmarks/fpad/certifications/'+key,
            headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
          }).then((res) => {
            certifications[key] = res.data;
          });
      }, {concurrency: 5});
    }).then(() => {
      return path.success({certifications});
    }).catch((error) => {
      if (error.response) {
        if (error.response) {
          if (error.response.status === 404) return path.missing({error});
        }
      }
      return path.error({error});
    });
}

function checkFpadResource({state, path}) {
  return axios({
    method: 'GET',
    url: oadaDomain+'/bookmarks/fpad',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }).then((response) => {
    return path.exists({response});
  }).catch((error) => {
    if (error.response && error.response.status === 404) return path.missing({error});
    throw error;
  });
}
function addFpadResource({state}) {
  //Add fpad resource
  return axios({
    method: 'POST',
    url: oadaDomain+'/resources',
    headers: {
      Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
      'Content-Type': 'application/vnd.fpad.1+json'
    },
    data: {}
  }).then((response) => {
    var id = response.headers.location.split('/')
    id = id[id.length-1]
    return axios({
      method: 'PUT',
      url: oadaDomain+'/bookmarks/fpad',
      headers: {
        Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
        'Content-Type': 'application/vnd.fpad.1+json'
      },
      data: {
        _id:'resources/'+id,
        _rev: '0-0'
      }
    });
  });
}

function checkCertsResource({state, path}) {
  //Check for certifications resource
  return axios({
    method: 'GET',
    url: oadaDomain+'/bookmarks/fpad/certifications',
    headers: {Authorization: 'Bearer '+ state.get('UserProfile.user.token')}
  }).then((response) => {
    return path.exists({response});
  }).catch((error) => {
    if (error.response && error.response.status === 404) return path.missing({error});
    throw error;
  });
}
function addCertsResource({state, path}) {
  //Add certifications resource
  return axios({
    method: 'POST',
    url: oadaDomain+'/resources',
    headers: {
      Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
      'Content-Type': 'application/vnd.fpad.certifications.globalgap.1+json'
    },
    data: {}
  }).then((response) => {
    var id = response.headers.location.split('/')
    id = id[id.length-1]
    return axios({
      method: 'PUT',
      url: oadaDomain+'/bookmarks/fpad/certifications',
      headers: {
        Authorization: 'Bearer '+ state.get('UserProfile.user.token'),
        'Content-Type': 'application/vnd.fpad.certifications.globalgap.1+json'
      },
      data: {
        _id:'resources/'+id,
        _rev: '0-0'
      }
    });
  });
}


export default [
	loadCertifications, {
		success: [
      set(state`App.model.certifications`, props`certifications`),
    ],
		error: [],
    missing: [
      checkFpadResource,
      {
        missing: [addFpadResource],
        exists: []
      },
      /* TODO - uncommment once alex's webhook smoosh works.
      checkCertsResource,
      {
        missing: [addCertsResource],
        exists: []
      },*/
      loadCertifications, {
        success: [
          set(state`App.model.certifications`, props`certifications`),
        ],
    		error: [],
        missing: []
      }
    ]
	},
]
