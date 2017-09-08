import React from 'react'

import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'

import CertCard from '../../pure-components/CertCard'

export default connect({
  audit: state`year_panel.years.${state`year_panel.selected_year`}.certifications.${props`name`}`,
  selected: state`app.view.certifications.${props`name`}.selected`,
  checked: signal`app.certChecked`,
  signAuditButtonClicked: signal`app.signAuditButtonClicked`,
},

class CertCardContainer extends React.Component {
  render() {
    return (
     <CertCard {...this.props} />
    )
  }
})
