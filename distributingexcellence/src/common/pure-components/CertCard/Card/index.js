import React from 'react'
import { FlatButton, Card, IconButton, Checkbox } from 'material-ui'
import JSONTree from 'react-json-tree'
import Dialog from 'material-ui/Dialog';

import styles from './index.module.css'
import PropTypes from 'prop-types';

import WarningIcon from 'material-ui/svg-icons/alert/warning'
import CheckIcon from 'material-ui/svg-icons/action/check-circle'

class CertCard extends React.Component {
  state = {
    open: false,
    dialog: ''
  }
  openDialog = (which) => {
    this.setState({open: true, dialog: which});
  }
  closeDialog = () => {
    this.setState({open: false});
  }
  render() {
    return (
      <Card className={styles.certCard} containerStyle={{display:'flex', flexDirection: 'column', flex:'1'}}>
        <div className={styles.content}>
          <div className={styles.leftContainer}>
            {
              this.props.onChecked ?
              <Checkbox
                label=''
                checked={this.props.checked}
                className={styles.checkbox}
                onCheck={(evt, checked) => {this.props.onChecked({id: this.props.id, checked})}}
              />
              :
              null
            }
          </div>
          <div className={styles.middleContainer} style={(this.props.onChecked) ? null : {marginLeft: 10}}>
            <div className={styles.productOrganization}>
              {this.props.product + ' - ' + this.props.organization}
            </div>
            <div className={styles.scoreContainer}>
              <div className={styles.score}>
                {'Score: ' + this.props.score}
              </div>
              <div className={styles.certLinks}>
                <FlatButton
                  label="Audit"
                  disabled={(this.props.audit == null)}
                  className={styles.certLink}
                  onTouchTap={() => {this.openDialog('audit')}}
                />
                <FlatButton
                  disabled={(this.props.correctiveActions == null)}
                  label="Corrective Actions"
                  className={styles.certLink}
                  onTouchTap={() => {this.openDialog('correctiveActions')}}
                />
                <FlatButton
                  disabled={(this.props.certificate == null)}
                  label="Certificate"
                  className={styles.certLink}
                  onTouchTap={() => {this.openDialog('certificate')}}
                />
              </div>
            </div>
            {
              false ? //TODO we have no way to know where they are synced from currently
              <div className={styles.syncInfo}>
                <IconButton
                  className={styles.syncIcon}
                  style={{padding: 0, width: 24, height: 24}}
                  iconClassName="material-icons">cached
                </IconButton>
                <div className={styles.from}>{'from ABC Audits'}</div>
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
              (this.props.signAuditButtonClicked == null) ?
              <div className={styles.signature}>
                <WarningIcon color={'#ec1a1a'} />
                <div className={styles.label} style={{color: '#ec1a1a'}}>{'Signature Invalid!'}</div>
              </div>
              :
              <FlatButton
  							primary={true}
                onTouchTap={()=>{this.props.finishAndSignClicked({id: this.props.id})}}
                label="Finish and sign" />
            }
          </div>
        </div>
        <Dialog
          title={this.props.product + ' - ' + this.props.organization}
          actions={[
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.closeDialog}
            />
          ]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeDialog}
          autoScrollBodyContent={true}>
          <JSONTree data={this.props[this.state.dialog] || {}} theme={"summerfruit:inverted"} />
        </Dialog>
      </Card>
    )
  }
}

CertCard.propTypes = {
  id: PropTypes.any,

  audit: PropTypes.object,
  correctiveActions: PropTypes.object,
  certificate: PropTypes.object,

  score: PropTypes.string,
  product: PropTypes.string,
  organization: PropTypes.string,
  date: PropTypes.string,
  validSignature: PropTypes.bool,

  onChecked: PropTypes.func,
  finishAndSignClicked: PropTypes.func,
  checked: PropTypes.bool
};

export default CertCard;
