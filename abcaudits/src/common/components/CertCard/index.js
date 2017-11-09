import React from 'react'

import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'

import CertCard from '../../pure-components/CertCard'

export default connect({
  audit: state`App.model.certifications.${props`id`}.audit`,
  checked: state`App.view.certifications.${props`name`}.selected`,
  onChecked: signal`Certifications.certChecked`
},

class CertCardContainer extends React.Component {
	render() {
    return (
     <CertCard {...this.props} />
    )
  }
})
