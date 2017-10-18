import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'

import styles from './index.module.css'

import TopBar from '../../common/components/TopBar'
import Certifications from '../Certifications';
import Connections from '../Connections';
import { title, description, background } from '../../config'

export default connect({
  mode: state`TopBar.mode`,
  mounted: signal`App.mounted`
},

class App extends React.Component {
  componentDidMount() {
    this.props.mounted();
  }
  render() {

    var page = null;
    if (this.props.mode === 'certifications') {
      page = <Certifications />
    } else if (this.props.mode === 'connections') {
      page = <Connections />
    }

    return (
      <div className={styles.app}>
        <TopBar
          style={{minHeight: 100, backgroundColor: background}}
          title={title}
          description={description} />
        <div className={styles.page}>
          {page}
        </div>
      </div>
    )
  }
})
