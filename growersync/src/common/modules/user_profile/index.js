import * as signals from './sequences'
import { Module } from 'cerebral'

export default Module({
	state: {
		user: {
			name: 'Grower Gary',
			token: 'ggg',
		}
  },

  signals,
})
