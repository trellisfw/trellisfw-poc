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
    shareAuditsButtonClicked: showClientDialog, 
    sharingDialogCancelled: cancelSharing, 
    sharingDialogSubmitted: submitSharing, 
    urlTextChanged: setUsernameText,
    usernameTextChanged: setUrlText,
  },

  modules: {

  },
}
