import connectWithTrellisClicked from './signals/connectWithTrellisClicked'
import trellisDomainChanged from './signals/trellisDomainChanged'
import {oadaDomain} from '../../config';
import uploadManuallyClicked from './signals/uploadManuallyClicked'
import closeFailDialog from './signals/closeFailDialog'

export default {
  state: {
		trellisDomain: 'https://api.pspperfection.trellisfw.io',
		showFail: false,
  },
	signals: {
		closeFailDialog,
		uploadManuallyClicked,
    connectWithTrellisClicked,
    trellisDomainChanged
  }
}
