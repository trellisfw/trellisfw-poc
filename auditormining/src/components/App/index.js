import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import Snackbar from 'material-ui/Snackbar';
import styles from './index.module.css'

import TopBar from '../../common/components/TopBar'
import Auditors from '../Auditors';
import Login from '../Login';
import {title, description, background} from '../../config'

export default connect({
  page: state`App.view.page`,
  snackBar: state`App.view.snackBar`,
  snackBarClosed: signal`App.snackBarClosed`,
  mounted: signal`App.mounted`
},

class App extends React.Component {
  componentDidMount() {
    this.props.mounted();
  }
  onSnackBarRequestClose = () => {
    this.props.snackBarClosed();
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
          style={{backgroundColor: background}}
          title={title}
          description={description}
          hideUser={true} />
        <div className={styles.page}>
          {page}
        </div>
        <Snackbar
          className={styles.snackBar}
          contentStyle={{backgroundColor: background, color: '#000'}}
          bodyStyle={{backgroundColor: background}}
          open={this.props.snackBar.open}
          message={this.props.snackBar.message}
          autoHideDuration={4000}
          onRequestClose={this.onSnackBarRequestClose}
        />
      </div>
    )
  }
})
