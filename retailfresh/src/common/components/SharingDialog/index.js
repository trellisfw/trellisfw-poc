import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Chip, IconButton, TextField, Dialog, FlatButton } from 'material-ui'
// eslint-disable-next-line
import styles from './index.module.css'

export default connect({
  open: state`SharingDialog.open`,
	usernameText: state`SharingDialog.username_text`,
	urlText: state`SharingDialog.trellis_domain_text`,
	client: state`client_panel.clients.${state`client_panel.selected_client`}`,
	addUserError: state`SharingDialog.add_user_error`,
	sharedUsers: state`SharingDialog.shared_users`,

  sharingDialogDone: signal`SharingDialog.sharingDialogDoneClicked`,
  urlTextChanged: signal`SharingDialog.urlTextChanged`,
  usernameTextChanged: signal`SharingDialog.usernameTextChanged`,
	addUserButtonClicked: signal`SharingDialog.addUserButtonClicked`
},

class SharingDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Done"
        primary={true}
        onClick={() => {this.props.sharingDialogDone({})}}
      />,
    ];
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={()=> {this.props.sharingDialogDone({})}}
			>
      <p>{'Who would you like to share these certifications with?'}</p>
				<div className={styles.sharingDialogUserEntry}>
	        <TextField
		        hintText="gary@gmail.com..."
			      value={this.props.usernameText}
				    floatingLabelText="username"
					  onChange={(evt, text)=>{this.props.usernameTextChanged({text})}}
					/>
					<TextField
						hintText="supercloud.com"
						floatingLabelText="trellis domain"
						value={this.props.urlText}
						onChange={(evt, text)=>{this.props.urlTextChanged({text})}}
					/>
					<div
						className={styles.sharingDialogAddUser}
						onTouchTap={() => this.props.addUserButtonClicked({})}>
						<IconButton
							disabled={(this.props.urlText === '') || (this.props.usernameText === '')}
							className={styles.clientPanelShareButton}
							iconClassName="material-icons">add_circle
						</IconButton>
						<p>{'Add user'}</p>
					</div>
				</div>
				{this.props.addUserError ?
					<p className={styles.addUserError}>{this.props.addUserError}</p>
					: null
				}
				<div>
          {
            Object.keys(this.props.sharedUsers).length > 0 ?
            <p>Currently shared with: </p>
            :
            null
          }
					<div>
						{Object.keys(this.props.sharedUsers).map((u) =>
							<Chip
								key={'shared-users-'+u}>
								{this.props.sharedUsers[u].name || this.props.sharedUsers[u].oidc.username}
							</Chip>
						)}
					</div>
				</div>
      </Dialog>
    )
  }
})
