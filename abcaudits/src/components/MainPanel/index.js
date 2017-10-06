import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import CertCard from '../CertCard'
import ClientPanel from '../ClientPanel'
import SharingDialog from '../SharingDialog'
import YearPanel from '../YearPanel'
import UserProfile from '../UserProfile'
import {
	MenuItem,
	Divider,
	IconButton,
	Checkbox,
	IconMenu,
} from 'material-ui'
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
  mode: state`app.view.main_panel.mode`,
  client: state`client_panel.selected_client`,
  clients: state`client_panel.clients`,
	certifications: state`app.view.certifications`,
	sharingDialog: state`sharing_dialog.open`,
	user: state`user_profile.user`,

  initialize: signal`app.initialize`,
  addCertButtonClicked: signal`app.addCertButtonClicked`,
  updateCertButtonClicked: signal`app.updateCertButtonClicked`,
	deleteAuditsButtonClicked: signal`app.deleteAuditsButtonClicked`,
	shareAuditsButtonClicked: signal`sharing_dialog.shareAuditsButtonClicked`,
	signInClicked: signal`user_profile.signInClicked`,
},

class MainPanel extends React.Component {

  render() {

    let years = {}
    let certs = null
    if (this.props.client) {
      certs = Object.keys(this.props.certifications).map((key, i) => {
        return <CertCard name={key} key={'cert-'+i}/>
      })
    }

    return (
			<div className='main-panel'>
				{this.props.sharingDialog ? <SharingDialog /> : null}
        <div className='main-panel-header'>
          <p className={'main-panel-header-text'}>Current Certifications</p>
          <IconButton
            disabled={!Object.keys(this.props.certifications).some((key) => {return this.props.certifications[key].selected})}
            className='main-panel-delete-button'
            onTouchTap={() => {this.props.deleteAuditsButtonClicked({})}}
            iconClassName="material-icons">delete
          </IconButton>
        </div>
        <hr />
        {certs}
				{this.props.client ? 
						(Object.keys(this.props.certifications).some((key) => {return this.props.certifications[key].selected}) ? 
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
					</div>)
        : null }
      </div>
    )
  }
})
