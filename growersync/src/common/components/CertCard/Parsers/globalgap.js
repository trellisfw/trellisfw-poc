import moment from 'moment'
import _ from 'lodash'

export function score(audit) {
  let score = _.get(audit, 'score.globalgap_levels.minor_musts.value');
  if (score == null) {
    return '0%';
  } else {
    return (100*parseFloat(score)).toFixed(1) + '%';
  }
}
export function product(audit) {
  let product = _.get(audit, 'scope.products_observed.0.name');
  if (product == null) {
    return '';
  } else {
    return product;
  }
}
export function organization(audit) {
  let organization = _.get(audit, 'organization.name');
  if (organization == null) {
    return '';
  } else {
    return organization;
  }
}
export function date(audit) {
  let date = _.get(audit,'conditions_during_audit.operation_observed_date');
  if (date == null || moment(date).isValid() === false) {
    return '';
  } else {
    return moment(date).format('MMMM D, YYYY');
  }
}
export function validSignature(audit) {
  if (_.get(audit, 'signatures')) {
    return true;
  }
  return false;
}

export default {
  score,
  product,
  organization,
  date,
  validSignature
}
