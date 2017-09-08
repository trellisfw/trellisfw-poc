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
  audits: state`app.model.audits`,
  mode: state`topBar.mode`,
},

class App extends React.Component {
  render() {

    let years = {}
    let certs = Object.keys(this.props.audits).map((key, i) => {
      if (years[this.props.audits[key].expiration]) {
        years[this.props.audits[key].expiration]++
      } else {
        years[this.props.audits[key].expiration] = 1;
      }
      return <CertCard name={key} key={'cert-'+i}/>
    })

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
