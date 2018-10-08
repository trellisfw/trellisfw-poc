import * as signals from './sequences'
import { Module } from 'cerebral';
import ClientPanel from '../ClientPanel'
import SharingDialog from '../SharingDialog'
import UserProfile from '../UserProfile'

import {oadaDomain} from '../../config'

export default Module({
  state: {
    oada_domain: oadaDomain,
    token: '',
    view: {
      mode: 'certifications',
      certifications: {},
    },
  },

  signals,

  modules: {
		client_panel: ClientPanel,
		sharing_dialog: SharingDialog,
		user_profile: UserProfile,
  }

})
