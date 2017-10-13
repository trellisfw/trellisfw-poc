import React from 'react'
import { Card, IconButton, Checkbox } from 'material-ui'
import './styles.css'
import moment from 'moment'
import _ from 'lodash'
import PropTypes from 'prop-types';

import WarningIcon from 'material-ui/svg-icons/alert/warning'
import CheckIcon from 'material-ui/svg-icons/action/check-circle'


class CertCard extends React.Component {
  getDate() {
    let date = _.get(this.props.audit,'conditions_during_audit.operation_observed_date');
    if (date == null || moment(date).isValid() === false) {
      return '';
    } else {
      return moment(date).format('MMMM D, YYYY');
    }
  }
  getScore() {
    let score = _.get(this.props.audit, 'score.globalgap_levels.minor_musts.value');
    if (score == null) {
      return '0 %';
    } else {
      return (100*parseFloat(score)).toFixed(1);
    }
  }
  getProduct() {
    let product = _.get(this.props.audit, 'scope.products_observed.0.name');
    if (product == null) {
      return '';
    } else {
      return product;
    }
  }
  getOrganization() {
    let organization = _.get(this.props.audit, 'organization.name');
    if (organization == null) {
      return '';
    } else {
      return organization;
    }
  }
  isValidSignature() {
    if (_.get(this.props.audit, 'signatures')) {
      return true;
    }
    return false;
  }
  render() {
    return (
     <Card className={'cert-card'} containerStyle={{display:'flex', flex:'1'}}>
       <div className='left-container'>
         <Checkbox
           label=''
            checked={this.props.checked}
            className={'checkbox'}
            onCheck={(evt, checked) => {this.props.onChecked({name: this.props.name, checked})}}
          />
        </div>
        <div className='middle-container'>
          <p className={'score'}>{'Score: ' + this.getScore()}</p>
          <p className={'product-organization'}>{this.getProduct() + ' - ' + this.getOrganization()}</p>
          {false ? <div className={'sync-info'}>
            <IconButton
              className={'sync-icon'}
              iconClassName="material-icons">cached
            </IconButton>
            <p className={'from'}>{'from '}</p>
          </div> : null }
        </div>
        <div className='right-container'>
          <p className={'expiration'}>{this.getDate()}</p>
          {
            this.isValidSignature() ?
            <div className={'signature'}>
              <CheckIcon color={'#448e3b'} />
              <div className={'label'}>{'Signature Valid'}</div>
            </div>
            :
            <div className={'signature'}>
              <WarningIcon color={'#ec1a1a'} />
              <div style={{color: '#ec1a1a'}}>{'Signature Invalid!'}</div>
            </div>
          }
        </div>
      </Card>
    )
  }
}

CertCard.propTypes = {
  onChecked: PropTypes.func,
  audit: PropTypes.object.isRequired,
  signAuditButtonClicked: PropTypes.func,
  checked: PropTypes.bool
};

export default CertCard;
