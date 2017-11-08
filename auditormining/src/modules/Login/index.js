import connectWithTrellisClicked from './signals/connectWithTrellisClicked'
import trellisDomainChanged from './signals/trellisDomainChanged'
import {oadaDomain} from '../../config';

export default {
  state: {
    trellisDomain: oadaDomain,
  },
  signals: {
    connectWithTrellisClicked,
    trellisDomainChanged
  }
}
