import React from 'react'
import styles from './index.module.css'
import { IconButton, MenuItem, Menu } from 'material-ui'
import Popover from 'material-ui/Popover';
import PropTypes from 'prop-types';
import { oadaDomain } from '../../../config'

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {popupOpen: false};
  }
  closePopup = () => {
    this.setState({popupOpen: false});
  }
  openPopup = () => {
    this.setState({popupOpen: true});
  }
  render() {
    return (
      <div className={styles.header} style={this.props.style}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            {this.props.logo}
          </div>
          <div className={styles.descContainer}>
            <div className={styles.title}>
              <div>{this.props.title || 'Default Title'}</div>
            </div>
            <div>
              {this.props.description || 'A description about the site.'}
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Popover
              open={this.state.popupOpen}
              anchorEl={this.refs.profileContainer}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.closePopup}>
							<Menu onTouchTap={this.closePopup}>
								<MenuItem primaryText="Sign out" onTouchTap={()=>{this.props.signOut({})}} />
                  </Menu>
          </Popover>
          {
						this.props.user ?
              <div ref='profileContainer' className={styles.profileContainer} onClick={()=>this.openPopup()}>
                <IconButton iconClassName="material-icons">
                  account_circle
                </IconButton>
                <div>{this.props.user.name}</div>
              </div>
						:
              <div className={styles.profileContainer}>
  							<div className={styles.signIn} onTouchTap={()=>{this.props.signInClicked({})}}>
  								Sign in
  							</div>
              </div>
					}
          {
            this.props.mode ?
              <div className={styles.modes}>
                <p
                  className={this.props.mode === 'connections' ? styles.highlightedMode : styles.mode }
                  onClick={()=>{this.props.modeClicked({mode: 'connections'})}}>
                  <u>{'Connections'}</u>
                </p>
                <p
                  className={this.props.mode === 'certifications' ? styles.highlightedMode : styles.mode}
                  onClick={()=>{this.props.modeClicked({mode: 'certifications'})}}>
                  <u>{'Certifications'}</u>
                </p>
              </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  modeClicked: PropTypes.func
};

export default TopBar;
