import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Chip, IconButton, TextField, Dialog, FlatButton } from 'material-ui'
import styles from './styles.css'

export default connect({
  open: state`sharing_dialog.open`,
	usernameText: state`sharing_dialog.username_text`,
	urlText: state`sharing_dialog.url_text`,
	client: state`client_panel.clients.${state`client_panel.selected_client`}`,
	addUserError: state`sharing_dialog.add_user_error`,

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
        title={"Sharing for "+this.props.client.name}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={()=> {this.props.sharingDialogCancelled({})}}
			>
				<p>{'Who should be able to view '+this.props.client.name+'\'s data?'}</p>
				<div className='sharing-dialog-user-entry'>
	        <TextField
		        hintText="gary@mail.com..."
			      value={this.props.usernameText}
				    floatingLabelText="username"
					  onChange={(evt, text)=>{this.props.usernameTextChanged({text})}}
					/>
					<TextField
						hintText="supercloud.com"
						floatingLabelText="fpad domain"
						value={this.props.urlText}
						onChange={(evt, text)=>{this.props.urlTextChanged({text})}}
					/>
					<div
						className='sharing-dialog-add-user'>
						<div
							onTouchTap={() => this.props.addUserButtonClicked({})}      
							className='sharing-dialog-add-user-button'>
							<IconButton        
								disabled={(this.props.urlText === '') || (this.props.usernameText === '')}
								className='client-panel-share-button'                          
								iconClassName="material-icons">add_circle
							</IconButton>
							<p>Add user</p>
						</div>
						{this.props.addUserError ? 
							<p className='add-user-error'>{this.props.addUserError}</p> 
							: null
						}
					</div>
				</div>
				<div>
					<p>Currently shared with: </p>
					<div className='share-dialog-shared users'>
						{this.props.client._meta._permissions ? Object.keys(this.props.client._meta._permissions).map((u) => 
							<Chip
								key={'shared-users-'+u}>
								{this.props.client._meta._permissions[u].name || this.props.client._meta._permissions[u].username}
							</Chip>
						) : null}
					</div>
				</div>
      </Dialog>
    )
  }
})
