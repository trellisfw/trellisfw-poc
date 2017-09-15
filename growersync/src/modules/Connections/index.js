import addConnectionClicked from './signals/addConnectionClicked'
import onDomainChanged from './signals/NewConnection/onDomainChanged'
import onConnectAsMeClicked from './signals/NewConnection/onConnectAsMeClicked'
import onEmailLinkClicked from './signals/NewConnection/onEmailLinkClicked'

export default {
  state: {
    connections: {
      1: {}
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
