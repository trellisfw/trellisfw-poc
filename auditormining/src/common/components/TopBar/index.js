import React from 'react'

import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'

import TopBar from '../../pure-components/TopBar'
import styles from './index.module.css';
import svgLogo from '../../svg/auditor_mining.svg'

export default connect({
  signOut: signal`TopBar.signOutClicked`,
  user: state`UserProfile.user`
},

class TopBarContainer extends React.Component {
  render() {
    let logo = <img src={svgLogo} className={styles.logo} alt="logo" />;
    return (
     <TopBar {...this.props} logo={logo} />
    )
  }
})
