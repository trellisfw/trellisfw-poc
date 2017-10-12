import {Controller} from 'cerebral'
import App from './modules/App'
import TopBar from './modules/TopBar'
import Login from './modules/Login'
import UserProfile from './modules/UserProfile'
import websocket from './common/providers/websocket';
import {devtoolsPort} from './config.js';

const Devtools = (
  process.env.NODE_ENV === 'production' ? null : require('cerebral/devtools').default
)

var devPort = devtoolsPort;
if (process.env.NODE_ENV !== 'production') {
  devPort = (devtoolsPort+parseInt(window.location.port, 10)-3000);
  console.log('Cerebral DevTools running on port:', devPort)
  if (parseInt(window.location.port, 10) !== 3000) console.warn('Sign in will not work, `metadata` in `src/config.js` is for localhost:3000');
}

export default Controller({
  devtools: Devtools && Devtools({
    host: 'localhost:'+devPort
  }),
  modules: {
    App,
    TopBar,
    Login,
    UserProfile
  },
  providers: [
    websocket
  ]
})
