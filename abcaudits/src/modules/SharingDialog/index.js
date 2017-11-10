import {
  showSharingDialog,
  doneSharing,
  setUsernameText,
  setUrlText,
  addUser,
} from './chains.js'
import {sharingUsername, sharingDomain} from '../../config'

export default {
  state: {
    open: false,
    trellis_domain_text: sharingDomain || '',
    username_text: sharingUsername || '',
    shared_users: {},
  },

  signals: {
		shareClientButtonClicked: showSharingDialog, 
    shareButtonClicked: showSharingDialog,
    sharingDialogDoneClicked: doneSharing, 
    usernameTextChanged: setUsernameText,
    urlTextChanged: setUrlText,
    addUserButtonClicked: addUser,
  },

  modules: {

  },
}
