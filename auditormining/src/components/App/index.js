import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'

import styles from './index.module.css'

import TopBar from '../../common/components/TopBar'
import Auditors from '../Auditors';
import Login from '../Login';

export default connect({
  page: state`App.view.page`,
  mounted: signal`App.mounted`
},

class App extends React.Component {
  componentDidMount() {
    this.props.mounted();
  }
  render() {

    var page = null;
    if (this.props.page === 'auditors') {
      page = <Auditors />
    } else if (this.props.page === 'login') {
      page = <Login />
    }

    return (
      <div className={styles.app}>
        <TopBar
          style={{backgroundColor: '#ffe599'}}
          title={'AuditorMining'}
          description={'Improving Food Safety through Analytics'}
          hideUser={true} />
        <div className={styles.page}>
          {page}
        </div>
      </div>
    )
  }
})
