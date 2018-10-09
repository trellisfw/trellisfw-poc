import * as signals from './sequences';
import { Module } from 'cerebral'

export default Module({
  state: {
    pendingChanges: {},
    model: {

    },
    view: {
      selectedYear: 'All'
    }
  },

  signals,
})
