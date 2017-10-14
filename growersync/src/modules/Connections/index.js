import addConnectionClicked from './signals/addConnectionClicked'
import onDomainChanged from './signals/NewConnection/onDomainChanged'
import onConnectAsMeClicked from './signals/NewConnection/onConnectAsMeClicked'
import onEmailLinkClicked from './signals/NewConnection/onEmailLinkClicked'

export default {
  state: {
    connections: {

    },
    newConnections: {

    }
  },
  signals: {
    addConnectionClicked,
    onDomainChanged,
    onConnectAsMeClicked,
    onEmailLinkClicked
  }
}
