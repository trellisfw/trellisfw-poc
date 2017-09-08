import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import CertCard from '../CertCard'
import ClientPanel from '../ClientPanel'
import SharingDialog from '../SharingDialog'
import YearPanel from '../YearPanel'
import UserProfile from '../UserProfile'
import MainPanel from '../MainPanel'
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
	deleteAuditsButtonClicked: signal`app.deleteAuditsButtonClicked`,
	shareAuditsButtonClicked: signal`sharing_dialog.shareAuditsButtonClicked`,
	signInClicked: signal`user_profile.signInClicked`,
},

class App extends React.Component {

  componentWillMount() {
    this.props.initialize({})
  }

  render() {

    let years = {}

    return (
      <div className='app'>
        <div 
          style={{}}
          className='header'>
          <div className='header-left'>
            <h1>ABC Audits</h1>
            <IconButton
              iconClassName="material-icons">store
            </IconButton>
            Audits done right!
          </div>
          <div
						className='header-right'>
						{this.props.user ? <UserProfile /> :
							<p onTouchTap={()=>{this.props.signInClicked({})}}> 
								Sign in 
							</p>
						}
            {false ? <div className='modes'>
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
            </div> : null}
          </div>
        </div>
        <div className='lower'>
          <div className='left-panel'>
						{this.props.user ? <ClientPanel /> : null }
					</div>
					{this.props. user ? <MainPanel /> : null}
        </div>
      </div>
    )
  }
})
