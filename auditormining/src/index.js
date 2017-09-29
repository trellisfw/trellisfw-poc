import React from 'react'
import {render} from 'react-dom'
import {Container} from '@cerebral/react'
import controller from './controller'
import App from './components/App'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//import registerServiceWorker from './registerServiceWorker';
//registerServiceWorker();

render((
  <Container controller={controller}>
    <MuiThemeProvider>
      <App /> 
    </MuiThemeProvider>
  </Container>
), document.querySelector('#root'))
