import signIn from './actions/signIn.js';
import signOut from './actions/signOut.js';

export default {
	state: {
		user: {
			name: 'Retailer Rick',
			token: 'rrr',
		}
  },

  signals: {
		signOutClicked: signOut,
		signInClicked: signIn,
  },

  modules: {

  },
}
