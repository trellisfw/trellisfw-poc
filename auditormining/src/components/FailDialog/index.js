import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import styles from './index.module.css'
import {FlatButton, Dialog} from 'material-ui'

export default connect({
	open: state`Login.showFail`,
	closeFailDialog: signal`Login.closeFailDialog`
},

class FailDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Okay, fine"
        primary={true}
        keyboardFocused={true}
				onClick={() => this.props.closeFailDialog()}
      />,
    ];

    return (
      <div>
        <Dialog
          title="WhAAAAT??"
          actions={actions}
          modal={false}
          open={this.props.open}
					onRequestClose={() => {this.props.closeFailDialog()}}
        >
        </Dialog>
      </div>
    );
  }
})
