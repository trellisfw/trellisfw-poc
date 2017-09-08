import React from 'react'
import { FlatButton, Card, Divider, IconButton, Checkbox } from 'material-ui'
import _ from 'lodash'
import PropTypes from 'prop-types';

import styles from './index.module.css'
import svgIncomingConnection from '../../svg/grower_sync.svg'

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
            <input className={styles.input} type='text' value={'https://abcaudits.fpad.io'} />
          </div>
          <div className={styles.buttonsContainer}>
            <div className={styles.button}>
              {'Connect Now as Me'}
            </div>
            <div style={{paddingLeft: 20, paddingRight: 20}}>{'or'}</div>
            <div className={styles.button}>
              {'Email Authorization Link'}
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
