import modeClicked from './signals/modeClicked'
import signInClicked from './signals/signInClicked'
import signOutClicked from './signals/signOutClicked'

export default {
  state: {
    mode: 'certifications'
  },
  signals: {
    modeClicked,
    signInClicked,
    signOutClicked
  }
}
