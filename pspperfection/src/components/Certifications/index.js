import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton } from 'material-ui'
import {tabColor} from '../../config'

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
    years = _.map(years, (count, year) => {
      return {year, count};
    });
    years = _.orderBy(years, ['year'], ['desc']);
    years.unshift({year: 'Current', count: this.getCertsCurrent().length});
    years.unshift({year: 'All', count: this.getCertsAll().length});
    return years;
  }
  getCertsYear(year) {
    let certs = _.map(this.props.certifications, (value, key) => {
      let certYear = this.getYear(value);
      if (certYear === year) {
        return key;
      } else {
        return null;
      }
    });
    return _.compact(certs);
  }
  getCertsCurrent() {
    /*
      Get all the certs that are current
        - Group by Organization, product, operation

        - Product: /scope/products_observed/0/name (merge of alpha order?)
        - Organization: /organization/organizationid/id (or: /organization/name)
        - Operation: /scope/operations/0/operation_type (merge of alpha order?)

    */
    let certs = _.map(this.props.certifications, (cert, key) => {
      return {cert, key}
    });
    let certGroups = _.groupBy(certs, (value) => {
      //TODO use parser for this
      let cert = value.cert;
      let organization = _.get(cert, 'organization.organizationid.id') || 'unknown';
      let products = _.get(cert, 'scope.products_observed') || [];
      let product = _.reduce(products, (string, p)=> {
        return string + (_.get(p, 'name') || 'unknown') + '-';
      }, '-');
      let operations = _.get(cert, 'scope.operations') || [];
      let operation = _.reduce(operations, (string, o)=> {
        return string + (_.get(o, 'operation_type') || 'unknown') + '-';
      }, '-');
      return organization+product+operation;
    });
    //Show newest cert of each group
    certs = _.map(certGroups, (group) => {
      return _.maxBy(group, (value) => {
        let date = _.get(value.cert,'conditions_during_audit.operation_observed_date');
        if (date == null || moment(date).isValid() === false) {
          date = 0;
        } else {
          date = parseInt(moment(date).format('x'), 10);
        }
        return date;
      }).key;
    });
    return certs;
  }
  getCertsAll() {
    //Get all the certs
    let certs = _.keys(this.props.certifications);
    return certs;
  }
  renderYears() {
    let years = this.getYears();
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
              backgroundColor: tabColor,
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
                <TableRow key={'year-category-'+year.year} selected={(year.year === this.props.selectedYear)}>
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
    let certs = [];
    if (this.props.selectedYear === 'All') {
      certs = this.getCertsAll();
    } else if (this.props.selectedYear === 'Current') {
      certs = this.getCertsCurrent();
    } else {
      certs = this.getCertsYear(this.props.selectedYear);
    }
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
