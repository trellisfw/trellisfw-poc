import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Chip, IconButton, TextField, Dialog, FlatButton } from 'material-ui'
// eslint-disable-next-line
import styles from './index.module.css'

export default connect({
  open: state`sharing_dialog.open`,
	usernameText: state`sharing_dialog.username_text`,
	urlText: state`sharing_dialog.trellis_domain_text`,
	client: state`client_panel.clients.${state`client_panel.selected_client`}`,
	addUserError: state`sharing_dialog.add_user_error`,
	sharedUsers: state`sharing_dialog.shared_users`,

  sharingDialogDone: signal`sharing_dialog.sharingDialogDoneClicked`,
  urlTextChanged: signal`sharing_dialog.urlTextChanged`,
  usernameTextChanged: signal`sharing_dialog.usernameTextChanged`,
	addUserButtonClicked: signal`sharing_dialog.addUserButtonClicked`
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
        title={'Sharing for '+this.props.client.name}
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
