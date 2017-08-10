import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import CertCard from '../CertCard'
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
  audits: state`app.model.audits`,
  mode: state`app.view.main.mode`,
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
      return <div key={'cert-hr-container'+i}>
        <CertCard name={key} key={'cert-'+i}/>
        <hr/>
      </div>
    })

    return (
      <div className='app'>
        <div className='header'>
          <div className='header-left'>
            <h1>RetailFresh</h1>
            <IconButton
              iconClassName="material-icons">store
            </IconButton>
            We sell retail stuff...fresh!
          </div>
          <div
            className='header-right'>
            <div
              className='profile-container'>
              Ron Retailer
              <IconButton
                iconClassName="material-icons">account_circle
              </IconButton>
            </div>
            <div className='modes'>
              <p 
                className={this.props.mode === 'connections' ? 'highlighted-mode' : 'mode'}
                onClick={()=>{this.props.modeClicked({mode: 'connections'})}}>
                <u>Connections</u>
              </p>
              <p 
                className={this.props.mode === 'certifications' ? 'highlighted-mode' : 'mode'}
                onClick={()=>{this.props.modeClicked({mode: 'certifications'})}}>
                <u>Certifications</u>
              </p>
            </div>
          </div>
        </div>
        <div className='lower'>
          <div className='left-panel'>
            <Table>
              displayRowCheckbox={false}>
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
          <div className='main-panel'>
            <div className='main-panel-header'>
              <p className={'main-panel-header-text'}>Current Certifications</p>
              <IconButton
                className='main-panel-delete-button'
                iconClassName="material-icons">delete
              </IconButton>
              <IconButton
                className='main-panel-share-button'
                iconClassName="material-icons">group
              </IconButton>
            </div>
            <hr />
            {certs}
          </div>
        </div>
      </div>
    )
  }
})
