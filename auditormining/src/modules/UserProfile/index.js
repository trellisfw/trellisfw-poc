import signOut from './actions/signOut.js';

export default {
	state: {
		user: {
			name: 'Auditor Audrey',
			token: 'aaa',
		}
  },

  signals: {
		signOutClicked: signOut
  },

  modules: {

  },
}
