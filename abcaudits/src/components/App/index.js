import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'

import Certifications from '../Certifications'
import TopBar from '../../common/components/TopBar'
// eslint-disable-next-line
import styles from './index.module.css'
import { title, description, background } from '../../config'

export default connect({
	user: state`UserProfile.user`,
  initialize: signal`App.initialize`,
},

class App extends React.Component {

  componentWillMount() {
    this.props.initialize({})
  }

  render() {
    return (
      <div className={styles['app']}>
				<TopBar
          style={{minHeight: 100, backgroundColor: background}}
          title={title}
          description={description} />
				<div className={styles.page}>
					<Certifications />
        </div>
      </div>
    )
  }
})
