import {Controller} from 'cerebral'
import App from './modules/App'
import TopBar from './modules/TopBar'
import Connections from './modules/Connections'

import {devtoolsPort} from './config.js';

const Devtools = (
  process.env.NODE_ENV === 'production' ? null : require('cerebral/devtools').default
)
var devPort = devtoolsPort;
if (process.env.NODE_ENV !== 'production') {
  devPort = (devtoolsPort+parseInt(window.location.port)-3000);
  console.log('Cerebral DevTools running on port:', devPort)
}
export default Controller({
  devtools: Devtools && Devtools({
    host: 'localhost:'+devPort
  }),
  state: {
    title: 'Hello world'
  },
  signals: {
  },
  modules: {
    app: App,
    topBar: TopBar,
    connections: Connections
  }
})
