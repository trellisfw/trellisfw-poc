import React from 'react'
import PropTypes from 'prop-types';

import styles from './index.module.css'
import svgIncomingConnection from '../../svg/incoming.svg'

class NewConnection extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.label}>
            {'Connection Type'}
          </div>
          <div>
            <img src={svgIncomingConnection} className={styles.typeIcon} alt="Incoming Connection" />
          </div>
          <div className={styles.label}>
            {'Incoming'}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.connectContainer}>
            <div className={styles.label}>
                {'Connect to:'}
            </div>
            <input className={styles.input} type='text' value={this.props.connection.domain} onChange={this.props.onDomainChange} />
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.button} onClick={this.props.onConnectAsMeClick}>
              {'Connect Now as Me'}
            </div>
            <div style={{paddingLeft: 20, paddingRight: 20}}>{'or'}</div>
            <div className={styles.button} onClick={this.props.onEmailLinkClick}>
              {'Email Authorization Link'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NewConnection.propTypes = {
  onDomainChange: PropTypes.func.isRequired,
  onConnectAsMeClick: PropTypes.func.isRequired,
  onEmailLinkClick: PropTypes.func.isRequired,
  connection: PropTypes.object.isRequired
};

export default NewConnection;
