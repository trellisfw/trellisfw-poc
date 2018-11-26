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
  mode: state`view.main_panel.mode`,
  client: state`client_panel.clients.${state`client_panel.selected_client`}`,
  selected_client: state`client_panel.selected_client`,
	certifications: state`client_panel.clients.${state`client_panel.selected_client`}.certifications`,
	sharingDialog: state`sharing_dialog.open`,
	noClientsError: state`client_panel.no_clients_error`,

  initialize: signal`initialize`,
  addCertButtonClicked: signal`certifications.addCertButtonClicked`,
  updateCertButtonClicked: signal`certifications.updateCertButtonClicked`,
	deleteAuditsButtonClicked: signal`certifications.deleteAuditsButtonClicked`,
},

class MainPanel extends React.Component {

  render() {

    return (
			<div className='main-panel'>
				{this.props.sharingDialog ? <SharingDialog /> : null}
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
						Object.keys(this.props.certifications || {}).map((key, i) => 
							<CertCard name={key} key={'cert-'+i}/>
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
