import {sequence} from 'cerebral'
import get from '../../OADA/factories/get';
import _ from 'lodash';
import { state } from 'cerebral/tags'

function parseAuthorizedApps({props, state}) {
  //Add connections to state
  let apps = {};
  _.map(props.response.data, (app, key) => {
    if (_.get(app, 'client.client_name') === null) return;
    let createTime = _.get(app, 'createTime') || 0;
    let expiresIn = _.get(app, 'expiresIn') || 0;
    let timeNow = new Date().getTime();
    if (createTime + (expiresIn*1000) < timeNow) {
      return;
    }
    let name = _.get(app, 'client.client_name');
    if (apps[name] == null) {
      apps[name] = true;
      state.set(`Connections.authorizedApps.${key}`, app);
    }
  });
}

function loadAuthorizedApps({path}) {
  return get.func(arguments)({path: '/authorizations'}).then(({response}) => {
    return path.success({response});
  }).catch((error) => {
    return path.error({error});
  });
}

export default sequence('loadAuthorizedApps', [
  loadAuthorizedApps,
  {
    success: [
      parseAuthorizedApps
    ],
    error: []
  }
]);
