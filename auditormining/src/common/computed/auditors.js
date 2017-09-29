import {compute} from 'cerebral'
import _ from 'lodash'
import {state} from 'cerebral/tags'

export default compute(
  state`App.model.certifications`,
  (certifications) => {
    return _.groupBy(certifications, (cert) => {
      let auditor = _.get(cert, 'certifying_body.auditor.name');
      let body = _.get(cert, 'certifying_body.name');
      if (auditor != null && body != null) {
        return body + ' => ' + auditor;
      } else {
        return null;
      }
    });
  },
  (certsByAuditor) => {
    return _.map(certsByAuditor, (certs, key) => {
      let auditor = _.get(certs[0], 'certifying_body.auditor.name') || 'Unknown';
      let body = _.get(certs[0], 'certifying_body.name') || 'Unknown';
      return {
        key: key || 'unknown',
        name: auditor,
        body: body,
        certifications: certs
      };
    });
  }
)
