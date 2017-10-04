import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import styles from './index.module.css'

import TopBar from '../../common/components/TopBar'
import CertCard from '../../common/components/CertCard'
import Certifications from '../Certifications';
import Connections from '../Connections';

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
    if (this.props.mode == 'certifications') {
      page = <Certifications />
    } else if (this.props.mode == 'connections') {
      page = <Connections />
    }

    return (
      <div className={styles.app}>
        <TopBar
          title={'GrowerSync'}
          description={'Automatic Data Connections for Growers'} />
        <div className={styles.page}>
          {page}
        </div>
      </div>
    )
  }
})
