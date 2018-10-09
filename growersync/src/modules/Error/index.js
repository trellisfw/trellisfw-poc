import * as signals from './sequences'
import { Module } from 'cerebral'

export default Module({
  state: {
    title: '',
    desc: '',
    open: false,
    error: null
  },

  signals,
})
