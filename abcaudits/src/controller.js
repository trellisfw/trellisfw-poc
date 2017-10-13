import {Controller} from 'cerebral'
import App from './modules/App'
import ClientPanel from './modules/ClientPanel'
import SharingDialog from './modules/SharingDialog'
import UserProfile from './modules/UserProfile'
import {devtoolsPort} from './config';

const Devtools = (
  process.env.NODE_ENV === 'production' ? null : require('cerebral/devtools').default
)

var devPort = devtoolsPort;
if (process.env.NODE_ENV !== 'production') {
  devPort = (devtoolsPort+parseInt(window.location.port, 10)-3000);
  console.log('Cerebral DevTools running on port:', devPort)
  if (parseInt(window.location.port, 10) !== 3000) console.warn('Sign in will not work, `metadata` in `src/config/config.dev.js` is for localhost:3000');
}

export default Controller({
  devtools: Devtools && Devtools({
    host: 'localhost:'+devPort
  }),
  state: {
  },
  signals: {
  },
  modules: {
    app: App,
		client_panel: ClientPanel,
		sharing_dialog: SharingDialog,
		user_profile: UserProfile,
  }
})
