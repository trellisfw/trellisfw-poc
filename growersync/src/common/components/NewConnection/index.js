import React from 'react'

import {connect} from 'cerebral/react'
import {signal, state, props} from 'cerebral/tags'

import NewConnection from '../../pure-components/NewConnection'

export default connect({
  onDomainChanged: signal`Connections.onDomainChanged`,
  onConnectAsMeClick: signal`Connections.onConnectAsMeClicked`,
  onEmailLinkClick: signal`Connections.onEmailLinkClicked`,
  connection: state`Connections.newConnections.${props`id`}`
},

class NewConnectionContainer extends React.Component {
  onDomainChange = (evt) => {
    this.props.onDomainChanged({domain: evt.target.value, id: this.props.id})
  }
  render() {
    var {onDomainChanged, ...other} = this.props;
    return (
      <NewConnection {...other} onDomainChange={this.onDomainChange}/>
    )
  }
})
