import modeClicked from './signals/modeClicked'
import signOutClicked from './signals/signOutClicked'

export default {
  state: {
    mode: 'login'
  },
  signals: {
    modeClicked,
    signOutClicked
  }
}
