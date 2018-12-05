import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import { TextField, Dialog, FlatButton } from 'material-ui'

export default connect({
  open: state`clients.client_dialog.open`,
  text: state`clients.client_dialog.text`,

  clientDialogSubmitted: signal`clients.clientDialogSubmitted`,
  clientDialogCancelled: signal`clients.clientDialogCancelled`,
  textChanged: signal`clients.textChanged`,
},

class AddClient extends React.Component {

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {this.props.clientDialogCancelled({})}}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled={this.props.text === ''}
        onClick={() => {this.props.clientDialogSubmitted({})}}
      />,
    ];

    return (
      <Dialog
        title="Add new client..."
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={()=> {this.props.clientDialogCancelled({})}}
      >
        <TextField
          hintText="Enter client name..."
          value={this.props.text}
          onChange={(evt, text)=>{this.props.textChanged({text})}}
        />
      </Dialog>
    )
  }
})
