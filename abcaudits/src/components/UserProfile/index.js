import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import { 
	Divider, 
	IconButton, 
	Checkbox,
	IconMenu,
	MenuItem,
} from 'material-ui'
import styles from './styles.css'
import _ from 'lodash'

export default connect({
	user: state`user_profile.user`,

	signOut: signal`user_profile.signOutClicked`,
	signIn: signal`user_profile.signInClicked`,
},

class UserProfile extends React.Component {

  componentWillMount() {
  }

  render() {
		return (
			<div className='profile-container'>
				<p>{this.props.user ? this.props.user.name : null}</p>
				<IconButton iconClassName="material-icons">account_circle</IconButton>
				<IconMenu
					iconButtonElement={<IconButton iconClassName="material-icons">keyboard_arrow_down</IconButton>}
					anchorOrigin={{horizontal: 'left', vertical: 'top'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}>
					<MenuItem 
						primaryText={this.props.user ? 'Sign out' : 'Sign in' }
						onTouchTap={()=> this.props.user ? this.props.signOut({}) : this.props.signIn({})}
					/>
				</IconMenu>
			</div>
    )
  }
})
