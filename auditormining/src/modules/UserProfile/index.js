import signOut from './actions/signOut.js';

export default {
	state: {
		user: null
  },

  signals: {
		signOutClicked: signOut
  },

  modules: {

  },
}
