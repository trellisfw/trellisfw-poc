import connectWithTrellisfwClicked from './signals/connectWithTrellisfwClicked'
import trellisfwDomainChanged from './signals/trellisfwDomainChanged'
import {oadaDomain} from '../../config';

export default {
  state: {
    trellisfwDomain: oadaDomain,
  },
  signals: {
    connectWithTrellisfwClicked,
    trellisfwDomainChanged
  }
}
