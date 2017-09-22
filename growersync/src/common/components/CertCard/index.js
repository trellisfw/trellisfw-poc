import React from 'react'

import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'

import CertCard from '../../pure-components/CertCard'

export default connect({
  audit: state`App.model.certifications.${props`id`}`,
  selected: state`App.view.certifications.${props`name`}.selected`,
  checked: signal`App.certChecked`,
  signAuditButtonClicked: signal`App.signAuditButtonClicked`,
},

class CertCardContainer extends React.Component {
  render() {
    return (
     <CertCard {...this.props} />
    )
  }
})
