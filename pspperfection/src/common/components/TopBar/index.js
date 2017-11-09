import React from 'react'

import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'

import TopBar from '../../pure-components/TopBar'
import styles from './index.module.css';
import { title } from '../../../config'

export default connect({
  mode: state`TopBar.mode`,
  modeClicked: signal`TopBar.modeClicked`,
  signOut: signal`TopBar.signOutClicked`,
  signIn: signal`TopBar.signInClicked`,
  user: state`UserProfile.user`,
},

class TopBarContainer extends React.Component {
	render() {
		let logo = <img src={title+'.svg'} className={styles.logo} alt="logo" />;
    return (
     <TopBar {...this.props} logo={logo} />
    )
  }
})
