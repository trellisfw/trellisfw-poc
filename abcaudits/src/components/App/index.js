import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import styles from './styles.css'

import CertCard from '../CertCard'
import ClientPanel from '../ClientPanel'
import SharingDialog from '../SharingDialog'
import YearPanel from '../YearPanel'
import UserProfile from '../UserProfile'
import MainPanel from '../MainPanel'
import TopBar from '../../common/components/TopBar'


export default connect({
	user: state`user_profile.user`,
  initialize: signal`app.initialize`,
},

class App extends React.Component {

  componentWillMount() {
    this.props.initialize({})
  }

  render() {
    let years = {}
    return (
      <div className='app'>
				<TopBar
          title={'ABC Audits'}
          description={'Audits done right!'} />
        <div className='lower'>
          <div className='left-panel'>
						{this.props.user ? <ClientPanel /> : null }
					</div>
					{this.props.user ? <MainPanel /> : null}
        </div>
      </div>
    )
  }
})
