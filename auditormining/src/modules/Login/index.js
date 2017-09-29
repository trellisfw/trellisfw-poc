import connectWithFpadClicked from './signals/connectWithFpadClicked'
import fpadDomainChanged from './signals/fpadDomainChanged'
import {fpadDomains} from '../../config.js';

export default {
  state: {
    fpadDomain: fpadDomains[0].url,
  },
  signals: {
    connectWithFpadClicked,
    fpadDomainChanged
  }
}
