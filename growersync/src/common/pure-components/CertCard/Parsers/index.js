import globalgap from './globalgap';
import _ from 'lodash';
const parsers = {
  'application/vnd.trellis.audit.globalgap.1+json': globalgap,
  'default': globalgap
}

function parser(audit) {
  let type = audit.type || 'default';
  let parser = parsers[type] ? parsers[type] : parsers.default;
  return _.mapValues(parser, (func) => {
    return func.bind(this, audit)
  });
}

export default parser;
