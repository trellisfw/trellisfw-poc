import * as signals from './sequences'
import { Module } from 'cerebral';
import clients from '../clients'
import sharing_dialog from '../../common/modules/sharing_dialog'
import user_profile from '../../common/modules/user_profile'
import certifications from '../../common/modules/certifications'
import oada from '@oada/cerebral-module'
import oadaProvider from '@oada/cerebral-provider'

export default Module({
  state: {
    view: {
      mode: 'certifications',
      certifications: {},
    },
  },

  modules: {
    oada,
    certifications,
    clients,
    sharing_dialog,
    user_profile,
  },

  providers: {
    oada: oadaProvider,
  },

  signals,

})
