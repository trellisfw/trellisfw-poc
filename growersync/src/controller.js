import {Controller} from 'cerebral'
import app from './modules/app'

import {devtoolsPort} from './config';

const Devtools = (
  process.env.NODE_ENV === 'production' ? null : require('cerebral/devtools').default
)
var devPort = devtoolsPort;
if (process.env.NODE_ENV !== 'production') {
  devPort = (devtoolsPort+parseInt(window.location.port, 10)-3000);
  console.log('Cerebral DevTools running on port:', devPort)
}
export default Controller(app,{
  devtools: Devtools && Devtools({
    host: 'localhost:'+devPort
  }),
})
