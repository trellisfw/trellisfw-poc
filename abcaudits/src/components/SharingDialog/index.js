import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { TextField, Dialog, FlatButton } from 'material-ui'
import styles from './styles.css'

export default connect({
  open: state`sharing_dialog.open`,
	usernameText: state`sharing_dialog.username_text`,
	urlText: state`sharing_dialog.url_text`,
	client: state`client_panel.clients.${state`client_panel.selected_client`}`,

  sharingDialogSubmitted: signal`sharing_dialog.sharingDialogSubmitted`,
  sharingDialogCancelled: signal`sharing_dialog.sharingDialogCancelled`,
  urlTextChanged: signal`sharing_dialog.urlTextChanged`,
  usernameTextChanged: signal`sharing_dialog.usernameTextChanged`,
},

class SharingDialog extends React.Component {

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {this.props.sharingDialogCancelled({})}}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled={(this.props.urlText === '') || (this.props.usernameText === '')}
        onClick={() => {this.props.sharingDialogSubmitted({})}}
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

      </Dialog>
    )
  }
})
