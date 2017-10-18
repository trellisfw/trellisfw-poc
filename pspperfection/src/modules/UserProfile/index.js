import signIn from './actions/signIn.js';
import signOut from './actions/signOut.js';

export default {
	state: {
		user: {
			name: 'Gary Grower',
			token: 'ggg',
		}
  },

  signals: {
		signOutClicked: signOut,
		signInClicked: signIn,
  },

  modules: {

  },
}
