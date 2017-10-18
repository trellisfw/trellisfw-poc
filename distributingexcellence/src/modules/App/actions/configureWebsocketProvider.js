import {oadaDomain} from '../../../config';

function configureWebsocketProvider ({websocket, state}) {
  if (websocket == null) throw new Error('Websocket provider is undefined. Please add it to your controller.')
  return websocket.configure({url: oadaDomain});
}
export default configureWebsocketProvider
