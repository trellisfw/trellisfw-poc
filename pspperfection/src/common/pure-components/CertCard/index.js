import React from 'react'
import PropTypes from 'prop-types';

import Card from './Card';
import Parsers from './Parsers';

class CertCard extends React.Component {
  render() {
    let parser = Parsers(this.props.audit);
    return (
     <Card
       score={parser.score()}
       product={parser.product()}
       organization={parser.organization()}
       date={parser.date()}
       validSignature={parser.validSignature()} />
    )
  }
}

CertCard.propTypes = {
  onChecked: PropTypes.func,
  audit: PropTypes.object.isRequired,
  signAuditButtonClicked: PropTypes.func,
  checked: PropTypes.bool
};

export default CertCard;
