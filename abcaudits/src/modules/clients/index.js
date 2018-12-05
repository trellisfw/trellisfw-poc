import * as signals from './sequences'
import { Module } from 'cerebral'

export default Module({
  state: {
    records: {},
    selected_client: undefined,
    client_dialog: {
      open: false,
      text: '',
    },
  },

  signals,

})
