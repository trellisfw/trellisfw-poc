import * as signals from './sequences'
import { Module } from 'cerebral'

export default Module({
	state: {
		user: {
			name: 'Auditor Audrey',
			token: 'aaa',
		}
  },

  signals,
})
