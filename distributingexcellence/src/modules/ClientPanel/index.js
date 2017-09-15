import {
  addClient,
  showClientDialog,
  cancelClient,
  submitClient,
  setClientText,
} from './chains.js'

export default {
  state: {
    selected_client: '',
    client_dialog: {
      visible: false,
      text: '',
    },
  },

  signals: {
    addClientButtonClicked: showClientDialog, 
    clientDialogCancelled: cancelClient, 
    clientDialogSubmitted: submitClient, 
    textChanged: setClientText,
  },

  modules: {

  },
}
