import * as signals from './sequences'
import { Module } from 'cerebral'
export default Module({
  state: {
    open: false,
    trellis_domain_text: '',
		username_text: '',
  },

  signals
})
