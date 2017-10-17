import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton } from 'material-ui'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import styles from './index.module.css'

import CertCard from '../../common/components/CertCard'

export default connect({
  certifications: state`App.model.certifications`,
	mode: state`App.view.main.mode`,
	shareButtonClicked: signal`SharingDialog.shareButtonClicked`,
},

class Certifications extends React.Component {
  render() {

    let years = {}
    let certs = Object.keys(this.props.certifications).map((key, i) => {
      if (years[this.props.certifications[key].expiration]) {
        years[this.props.certifications[key].expiration]++
      } else {
        years[this.props.certifications[key].expiration] = 1;
      }
      return <CertCard name={key} key={'cert-'+i} id={key} />
    })

    return (
      <div className={styles.root}>
        <div className={styles.leftPanel}>
          <Table>
            <TableHeader
              displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Year</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              stripedRows={true}
              displayRowCheckbox={false}>
              {Object.keys(years).map(year =>
                <TableRow key={'year-category-'+year}>
                  <TableRowColumn
                    onClick={() => {this.props.yearCategoryClicked({})}}>
                    {`${year} (${years[year]})`}
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className={styles.mainPanel}>
          <div className={styles.header}>
            <div className={styles.title}>
              {'Current Certifications'}
            </div>
            <IconButton
              iconClassName="material-icons">delete
            </IconButton>
            <IconButton
							className='share-button'
							onTouchTap={()=>{this.props.shareButtonClicked({})}}
							iconClassName="material-icons">group
            </IconButton>
          </div>
          <Divider/>
          {certs}
        </div>
      </div>
    )
  }
})
