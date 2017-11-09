import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton } from 'material-ui'
import styles from './index.module.css'

import CertCard from '../../common/components/CertCard'
import SharingDialog from '../../common/components/SharingDialog'
import ClientPanel from '../ClientPanel'

export default connect({
  certifications: state`App.model.certifications`,
  client: state`ClientPanel.selected_client`,

  sharingDialogOpen: state`SharingDialog.open`,
  shareButtonClicked: signal`SharingDialog.shareButtonClicked`,
  addCertButtonClicked: signal`App.addCertButtonClicked`,
  signAuditButtonClicked: signal`App.signAuditButtonClicked`,
},

class Certifications extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {this.props.sharingDialogOpen ? <SharingDialog /> : null}
        <div className={styles.leftPanel}>
          <ClientPanel />
        </div>
        <div className={styles.mainPanel}>
          <div className={styles.header}>
            <div className={styles.title}>
              {'Current Certifications'}
            </div>
            <IconButton
              className={styles['delete-button']}
              disabled={!Object.keys(this.props.certifications).some((key) => {return this.props.certifications[key].selected})}
              onTouchTap={() => {this.props.deleteAuditsButtonClicked({})}}
              iconClassName="material-icons">delete
            </IconButton>
          </div>
          <Divider/>
          {this.props.client ? <div
            onClick={()=> this.props.addCertButtonClicked({})}
            className={styles['add-cert-button']}>
            <IconButton
              iconClassName="material-icons">add_circle
            </IconButton> 
            <p>New Certification</p>
          </div> : null }
          <div className={styles.certifications}>
            {this.props.noClientsError ?
              <p className={styles['no-clients-error']}>User has no clients or certifications</p>
              :
              (this.props.client ? 
                <div className={styles['scrollable-certifications']}>
									{Object.keys(this.props.certifications).filter(key => key.charAt(0) !== '_').map((key, i) => 
                    <CertCard name={key} key={'cert-'+i} id={key} signAuditButtonClicked={this.props.signAuditButtonClicked}/>
									)}
								</div>
                : null
              )
            }
          </div>
          {/*!this.props.noClientsError && this.props.client ? 
            Object.keys(this.props.certifications).some((key) => this.props.certifications[key].selected) ? 
            <div
              onClick={()=> this.props.updateCertButtonClicked({})}
              className='main-panel-update-cert'>
              <IconButton
                iconClassName="material-icons">update
              </IconButton> 
              <p>Update Certifications</p>
            </div>
            :
            <div
              onClick={()=> this.props.addCertButtonClicked({})}
              className={styles['add-cert-button']}>
              <IconButton
                iconClassName="material-icons">add_circle
              </IconButton> 
              <p>New Certification</p>
            </div>
            : null*/ }
        </div>
      </div>
    )
  }
})
