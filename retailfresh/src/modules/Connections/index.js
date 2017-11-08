import addConnectionClicked from './signals/addConnectionClicked'
import onDomainChanged from './signals/NewConnection/onDomainChanged'
import onConnectAsMeClicked from './signals/NewConnection/onConnectAsMeClicked'
import onEmailLinkClicked from './signals/NewConnection/onEmailLinkClicked'
import connectionsChanged from './signals/connectionsChanged';

export default {
  state: {
    connections: {

    },
    newConnections: {

    },
    authorizedApps: {

    },
    counters: {
      certificationsRecieved: 0
    }
  },
  signals: {
    addConnectionClicked,
    onDomainChanged,
    onConnectAsMeClicked,
    onEmailLinkClicked,
    connectionsChanged
  }
}
