import connectWithFpadClicked from './signals/connectWithFpadClicked'
import fpadDomainChanged from './signals/fpadDomainChanged'
import {oadaDomain} from '../../config';

export default {
  state: {
    fpadDomain: oadaDomain,
  },
  signals: {
    connectWithFpadClicked,
    fpadDomainChanged
  }
}
