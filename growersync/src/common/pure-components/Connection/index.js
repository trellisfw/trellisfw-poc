import React from 'react'
import PropTypes from 'prop-types';

import styles from './index.module.css'
import svgIncomingConnection from '../../svg/incoming.svg'
import svgABC from '../../svg/abc_audits.svg'

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
          <div className={styles.leftSide}>
            <div className={styles.iconContainer}>
                <img src={svgABC} className={styles.nameIcon} alt="name" />
                <div>{'ABC Audits'}</div>
            </div>
            <div className={styles.status}>
              {'Received 0 Certifications'}
            </div>
            <div className={styles.updatedContainer}>
              <div className={styles.label}>
                {'Last Update:'}
              </div>
              <div className={styles.time}>
                {' 0 minutes ago'}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NewConnection.propTypes = {

};

export default NewConnection;
