import React from 'react'

import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'

import TopBar from '../../pure-components/TopBar'
import styles from './index.module.css';
import svgSprout from '../../svg/abc_audits.svg'

export default connect({
  signOut: signal`clients.signOutClicked`,
  signInClicked: signal`initialize`,
  user: state`user_profile.user`,
},

class TopBarContainer extends React.Component {
  render() {
    let logo = <img src={svgSprout} className={styles.logo} alt="logo" />;
    return (
     <TopBar {...this.props} style={{backgroundColor: '#9fc5f8'}} logo={logo} />
    )
  }
})
