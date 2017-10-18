import {
  showSharingDialog,
  doneSharing,
  setUsernameText,
  setUrlText,
	addUser,
} from './chains.js'

export default {
  state: {
    open: false,
    trellis_domain_text: '',
		username_text: '',
		shared_users: {},
  },

  signals: {
    shareButtonClicked: showSharingDialog,
    sharingDialogDoneClicked: doneSharing,

    addUserButtonClicked: addUser,
    usernameTextChanged: setUsernameText,
    urlTextChanged: setUrlText,
  },

  modules: {

  },
}
