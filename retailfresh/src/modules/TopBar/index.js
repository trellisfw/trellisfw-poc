import modeClicked from './signals/modeClicked'
import signInClicked from './signals/signInClicked'
import signOutClicked from './signals/signOutClicked'

export default {
  state: {
    mode: 'connections'
  },
  signals: {
    modeClicked,
    signInClicked,
    signOutClicked
  }
}
