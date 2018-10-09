import * as signals from './sequences';
import { Module } from 'cerebral'
import TopBar from '../TopBar'
import Connections from '../Connections'
import Certifications from '../Certifications'
import sharing_dialog from '../../common/modules/sharing_dialog';
import user_profile from '../../common/modules/user_profile';
import Error from '../Error';
import websocket from '../../common/providers/websocket';
console.log(websocket)

export default Module({
	state: {
    model: {
      certifications: {

      }
    },
    view: {

    }
  },

modules: {
		sharing_dialog,
    TopBar,
    Connections,
    Certifications,
    user_profile,
    Error
  },

  signals,

  providers: {
    websocket
  }
})

