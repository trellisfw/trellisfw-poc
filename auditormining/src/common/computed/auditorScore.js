import {compute} from 'cerebral'
import _ from 'lodash'
import {props} from 'cerebral/tags'

//Audit score
function certScore(certification) {
  let score = _.get(certification, 'score.globalgap_levels.minor_musts.value');
  if (score == null) return null;
  return (100*parseFloat(score)).toFixed(1);
}

export default compute(
  props`auditor`,
  (auditor) => {
    //Map certs to scores
    return _.map(auditor.certifications, (cert) => {
      return certScore(cert);
    });
  },
  (scores) => {
    //Average scores
    return _.chain(scores)
      .compact()
      .sum()
      .divide(scores.length)
      .round()
      .value();
  }
)
