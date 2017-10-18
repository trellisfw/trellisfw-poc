import signIn from './actions/signIn.js';
import signOut from './actions/signOut.js';

export default {
	state: {
		user: {
			name: 'Pete Packer',
			token: 'ppp',
		}
  },

  signals: {
		signOutClicked: signOut,
		signInClicked: signIn,
  },

  modules: {

  },
}
