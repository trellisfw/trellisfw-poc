import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import Snackbar from 'material-ui/Snackbar';

import styles from './index.module.css'

import TopBar from '../../common/components/TopBar'
import Certifications from '../Certifications';
import Connections from '../Connections';
import ErrorDialog from '../ErrorDialog';
import {title, description, background} from '../../config'

export default connect({
  mode: state`TopBar.mode`,
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
        <ErrorDialog />
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
