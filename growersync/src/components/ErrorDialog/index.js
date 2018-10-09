import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'

export default connect({
  open: state`Error.open`,
  title: state`Error.title`,
  desc: state`Error.desc`,
  error: state`Error.error`,
  closePressed: signal`Error.onClosePressed`,
}, class DialogExampleSimple extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.props.closePressed({});
  };

  render() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <Dialog
        title={this.props.title || 'Error'}
        actions={actions}
        modal={false}
        open={this.props.open || false}
        onRequestClose={this.handleClose}>
        {this.props.desc}
        {this.props.error ? ' Error: ' + this.props.error : ''}
      </Dialog>
    );
  }
})
