import {
  showSharingDialog,
  cancelSharing,
  submitSharing,
  setUsernameText,
  setUrlText,
} from './chains.js'

export default {
  state: {
    open: false,
    url_text: '',
    username_text: '',
  },

  signals: {
    shareAuditsButtonClicked: showSharingDialog, 
    sharingDialogCancelled: cancelSharing, 
    sharingDialogSubmitted: submitSharing, 
    usernameTextChanged: setUsernameText,
    urlTextChanged: setUrlText,
  },

  modules: {

  },
}
