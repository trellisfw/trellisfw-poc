import React from 'react'

import {connect} from 'cerebral/react'
import {signal, state, props} from 'cerebral/tags'

import NewConnection from '../../pure-components/NewConnection'

export default connect({
  onDomainChanged: signal`Connections.onDomainChanged`,
  onConnectAsMeClicked: signal`Connections.onConnectAsMeClicked`,
  onEmailLinkClick: signal`Connections.onEmailLinkClicked`,
  connection: state`Connections.newConnections.${props`id`}`
},

class NewConnectionContainer extends React.Component {
  onDomainChange = (evt) => {
    this.props.onDomainChanged({domain: evt.target.value, id: this.props.id})
  }
  onConnectAsMeClick = () => {
    console.log({id: this.props.id})
    this.props.onConnectAsMeClicked({id: this.props.id});
  }
  render() {
    var {onDomainChanged, onConnectAsMeClicked, ...other} = this.props;
    return (
      <NewConnection {...other} onConnectAsMeClick={this.onConnectAsMeClick} onDomainChange={this.onDomainChange}/>
    )
  }
})
