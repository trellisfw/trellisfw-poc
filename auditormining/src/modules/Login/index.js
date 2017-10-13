import connectWithFpadClicked from './signals/connectWithFpadClicked'
import fpadDomainChanged from './signals/fpadDomainChanged'
import {oadaDomains} from '../../config';

export default {
  state: {
    fpadDomain: oadaDomains[0].url,
  },
  signals: {
    connectWithFpadClicked,
    fpadDomainChanged
  }
}
