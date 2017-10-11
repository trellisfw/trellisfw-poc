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
    url_text: '',
		username_text: '',
  },

  signals: {
    shareClientButtonClicked: showSharingDialog, 
    sharingDialogDoneClicked: doneSharing, 
    usernameTextChanged: setUsernameText,
    urlTextChanged: setUrlText,
		addUserButtonClicked: addUser,
  },

  modules: {

  },
}
