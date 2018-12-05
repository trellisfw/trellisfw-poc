import * as signals from './sequences'
import { Module } from 'cerebral';

export default Module({
  state: {records: {}},
  signals,
})
