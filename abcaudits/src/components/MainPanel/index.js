import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import CertCard from '../CertCard'
import SharingDialog from '../../common/components/SharingDialog'
//import SharingDialog from '../SharingDialog'
import {
	IconButton,
} from 'material-ui'
// eslint-disable-next-line
import styles from './styles.css'

export default connect({
  certifications: state`view.certifications`,
  client: state`clients.selected_client`,
  person: state`clients.records.${state`clients.selected_client`}.name`,
	sharingDialog: state`sharing_dialog.open`,
  noClientsError: state`clients.no_clients_error`,
  connection_id: state`clients.connection_id`,

  initialize: signal`initialize`,
  addCertButtonClicked: signal`clients.addCertButtonClicked`,
  updateCertButtonClicked: signal`clients.updateCertButtonClicked`,
	deleteAuditsButtonClicked: signal`clients.deleteCertsButtonClicked`,
},

class MainPanel extends React.Component {

  render() {
    return (
			<div className='main-panel'>
        {this.props.sharingDialog ? 
          <SharingDialog 
            connection_id={this.props.connection_id}
            permissionsPath={`/bookmarks/trellis/clients/${this.props.client}/certifications/_meta/_permissions`}
            title={'Sharing for '+this.props.person}
          /> : null
        }
        <div className='main-panel-header'>
          <p className={'main-panel-header-text'}>Current Certifications</p>
          <IconButton
            disabled={!Object.keys(this.props.certifications || {}).some((key) => {return this.props.certifications[key].selected})}
            className='main-panel-delete-button'
            onTouchTap={() => {this.props.deleteAuditsButtonClicked({})}}
            iconClassName="material-icons">delete
          </IconButton>
        </div>
				<hr />
				{this.props.noClientsError ?
					<p className='no-clients-error'>User has no clients or certifications</p>
					:
					this.props.client ? 
            Object.keys(this.props.certifications || {}).filter((k) => k.charAt(0) !== '_' && this.props.certifications[k].audit).map((key, i) => 
							<CertCard certId={key} key={'cert-'+i}/>
						)
					: null
				}
				{!this.props.noClientsError && this.props.client ? 
					Object.keys(this.props.certifications || {}).some((key) => this.props.certifications[key].selected) ? 
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
						className='main-panel-add-cert'>
						<IconButton
							iconClassName="material-icons">add_circle
						</IconButton> 
						<p>New Certification</p>
					</div>
        : null }
      </div>
    )
  }
})
