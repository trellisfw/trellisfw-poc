import React from 'react'

import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'

import TopBar from '../../pure-components/TopBar'
import styles from './index.module.css';
import svgSprout from '../../svg/grower_sync.svg'

export default connect({
  mode: state`topBar.mode`,
  modeClicked: signal`topBar.modeClicked`
},

class TopBarContainer extends React.Component {
  render() {
    let logo = <img src={svgSprout} className={styles.logo} alt="logo" />;
    return (
     <TopBar {...this.props} logo={logo} />
    )
  }
})
