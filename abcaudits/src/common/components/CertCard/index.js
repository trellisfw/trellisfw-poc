import React from 'react'

import {connect} from '@cerebral/react'
import {state, signal, props} from 'cerebral/tags'

import CertCard from '../pure-components/CertCard'

export default connect({
  audit: state`client_panel.clients.${state`client_panel.selected_client`}.certifications.${props`name`}`,
  selected: state`view.certifications.${props`name`}.selected`,
  checked: signal`certChecked`,
  signAuditButtonClicked: signal`signAuditButtonClicked`,
},

class CertCardContainer extends React.Component {
  render() {
    return (
     <CertCard {...this.props} />
    )
  }
})
