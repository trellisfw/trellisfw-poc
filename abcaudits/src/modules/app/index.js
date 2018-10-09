import * as signals from './sequences'
import { Module } from 'cerebral';
import client_panel from '../client_panel'
import sharing_dialog from '../../common/modules/sharing_dialog'
import user_profile from '../../common/modules/user_profile'

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
		client_panel,
		sharing_dialog,
		user_profile,
  }

})
