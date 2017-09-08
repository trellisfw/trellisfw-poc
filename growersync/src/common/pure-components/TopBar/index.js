import React from 'react'
import styles from './index.module.css'
import { IconButton } from 'material-ui'
import PropTypes from 'prop-types';

class TopBar extends React.Component {
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
          <div className={styles.profileContainer}>
            {'Gary Grower'}
            <IconButton iconClassName="material-icons">
              {'account_circle'}
            </IconButton>
          </div>
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
        </div>
      </div>
    )
  }
}

TopBar.propTypes = {
  modeClicked: PropTypes.func.isRequired
};

export default TopBar;
