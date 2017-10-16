import React from 'react'
import { Card, IconButton, Checkbox } from 'material-ui'
import styles from './index.module.css'
import PropTypes from 'prop-types';

import WarningIcon from 'material-ui/svg-icons/alert/warning'
import CheckIcon from 'material-ui/svg-icons/action/check-circle'

class CertCard extends React.Component {
  render() {
    return (
     <Card className={styles.certCard} containerStyle={{display:'flex', flex:'1'}}>
       <div className={styles.leftContainer}>
         <Checkbox
           label=''
            checked={this.props.checked}
            className={styles.checkbox}
            onCheck={(evt, checked) => {this.props.onChecked({name: this.props.name, checked})}}
          />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.score}>
            {'Score: ' + this.props.score}
          </div>
          <div className={styles.productOrganization}>
            {this.props.product + ' - ' + this.props.organization}
          </div>
          {
            false ?
              <div className={styles.syncInfo}>
                <IconButton
                  className={styles.syncIcon}
                  iconClassName="material-icons">cached
                </IconButton>
                <div className={styles.from}>{'from '}</div>
              </div>
            :
            null
          }
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.expiration}>
            {this.props.date}
          </div>
          {
            this.props.validSignature ?
              <div className={styles.signature}>
                <CheckIcon color={'#448e3b'} />
                <div className={styles.label}>{'Signature Valid'}</div>
              </div>
            :
              <div className={styles.signature}>
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
  score: PropTypes.string,
  product: PropTypes.string,
  organization: PropTypes.string,
  date: PropTypes.string,
  validSignature: PropTypes.bool,

  onChecked: PropTypes.func,
  signAuditButtonClicked: PropTypes.func,
  checked: PropTypes.bool
};

export default CertCard;
