import {
	signIn,
	signOut,
} from './chains.js'

export default {
	state: {
		user: {
			name: 'Auditor Audrey',
			token: 'aaa',
		}
  },

  signals: {
		signOutClicked: signOut,
		signInClicked: signIn,
  },

  modules: {

  },
}
