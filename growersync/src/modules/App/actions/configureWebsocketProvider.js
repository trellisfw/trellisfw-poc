import {oadaDomain} from '../../../config';
import Promise from 'bluebird';
function configureWebsocketProvider ({websocket, state}) {
  return Promise.resolve().then(() => {
    if (websocket == null) throw new Error('Websocket provider is undefined. Please add it to your controller.')
    return websocket.configure({url: oadaDomain});
  })
}
export default configureWebsocketProvider
