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
    shareClientButtonClicked: showSharingDialog, 
    sharingDialogDoneClicked: doneSharing, 
    usernameTextChanged: setUsernameText,
    urlTextChanged: setUrlText,
    addUserButtonClicked: addUser,
  },

  modules: {

  },
}
