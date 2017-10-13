import {
  showClientDialog,
  cancelClient,
  submitClient,
  setClientText,
  setClient,
  init,
} from './chains.js'

export default {
  state: {
    clients: {},
    client_dialog: {
      open: false,
      text: '',
    },
  },

  signals: {
    initialize: init,
    addClientButtonClicked: showClientDialog, 
    clientDialogCancelled: cancelClient, 
    clientDialogSubmitted: submitClient, 
    textChanged: setClientText,
    clientClicked: setClient,
  },

  modules: {

  },
}
