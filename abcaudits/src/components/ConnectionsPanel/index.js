import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import YearPanel from '../YearPanel'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import styles from './styles.css'

export default connect({
},

class ConnectionsPanel extends React.Component {

  componentWillMount() {
  }

  render() {

    let years = {}
    let certs = null
    if (this.props.client) {
      certs = Object.keys(this.props.certifications).map((key, i) => {
        return <CertCard name={key} key={'cert-'+i}/>
      })
    }

    return (
			<div className='connections-panel'>

      </div>
    )
  }
})
