import { unset, set } from 'cerebral/operators'
import {state} from 'cerebral/tags'

export default [
  unset(state`UserProfile.user`),
  set(state`App.model.certifications`, {}),
  set(state`App.view.page`, 'login')
]
