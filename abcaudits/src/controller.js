import {Controller} from 'cerebral'
import App from './modules/App'

const Devtools = (
  process.env.NODE_ENV === 'production' ? null : require('cerebral/devtools').default 
)

export default Controller({
  devtools: Devtools && Devtools({
    host: 'localhost:8585' 
  }),
  state: {
  },
  signals: {
  },
  modules: {
    app: App,
  }
})
