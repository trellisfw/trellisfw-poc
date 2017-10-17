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

import _ from 'lodash'
import moment from 'moment'
import styles from './index.module.css'

import CertCard from '../../common/components/CertCard'
import SharingDialog from '../../common/components/SharingDialog'

export default connect({
  certifications: state`App.model.certifications`,
  selectedYear: state`Certifications.view.selectedYear`,
  yearClicked: signal`Certifications.yearClicked`,

  sharingDialogOpen: state`SharingDialog.open`,
	shareButtonClicked: signal`SharingDialog.shareButtonClicked`,
},

class Certifications extends React.Component {
  getYear(audit) {
    let date = _.get(audit,'conditions_during_audit.operation_observed_date');
    if (date == null || moment(date).isValid() === false) {
      return '';
    } else {
      return moment(date).format('YYYY');
    }
  }
  getYears() {
    let years = {};
    _.forEach((this.props.certifications), (cert) => {
      let year = this.getYear(cert);
      if (years[year]) {
        years[year]++
      } else {
        years[year] = 1;
      }
    });
    let currentYear = moment().format('YYYY');
    years = _.map(years, (count, year) => {
      if (year === currentYear) year = 'Current'
      return {year, count};
    });
    return _.orderBy(years, ['year'], ['desc']);
  }
  renderYears() {
    let years = this.getYears();
    let selectedYear = this.props.selectedYear || (years[0] || {}).year;
    return (
      <Table onCellClick={(row)=>{this.props.yearClicked({year: years[row].year})}}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          style={{height: 10}}>
          <TableRow style={{padding: 0, height: 10}}>
            <TableHeaderColumn style={{
              textAlign: 'center',
              fontSize: 17,
              color: '#fff',
              backgroundColor: '#009e0f',
              height: 46
            }}>
              Year
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows={false}
          displayRowCheckbox={false}>
          {
            _.map(years, (year) => {
              return (
                <TableRow key={'year-category-'+year.year} selected={(year.year === selectedYear)}>
                  <TableRowColumn style={{display: 'flex', cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>{`${year.year}`}</div>
                    <div>{`(${year.count})`}</div>
                  </TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    );
  }
  renderCertifications() {
    //Filter down by year
    let years = this.getYears();
    let currentYear = moment().format('YYYY');
    let selectedYear = this.props.selectedYear || (years[0] || {}).year;
    let certs = _.map(this.props.certifications, (value, key) => {
      let year = this.getYear(value);
      if (year === currentYear) year = 'Current'
      if (year === selectedYear) {
        return key;
      } else {
        return null;
      }
    });
    certs = _.compact(certs);
    return _.map(certs, (key) => {
      return <CertCard name={key} key={'cert-'+key} id={key} />
    });
  }
  render() {
    return (
      <div className={styles.root}>
        {this.props.sharingDialogOpen ? <SharingDialog /> : null}
        <div className={styles.leftPanel}>
          {this.renderYears()}
        </div>
        <div className={styles.mainPanel}>
          <div className={styles.header}>
            <div className={styles.title}>
              {'Current Certifications'}
            </div>
            <IconButton
							className='share-button'
							onTouchTap={()=>{this.props.shareButtonClicked({})}}
							iconClassName="material-icons">group
            </IconButton>
          </div>
          <Divider/>
          <div className={styles.certifications}>
            {this.renderCertifications()}
          </div>
        </div>
      </div>
    )
  }
})
