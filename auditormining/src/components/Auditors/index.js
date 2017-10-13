import React from 'react'
import {connect} from '@cerebral/react'
import {state} from 'cerebral/tags'
import SyncIcon from 'material-ui/svg-icons/notification/sync';
import _ from 'lodash';

import styles from './index.module.css'
import {oadaDomains} from '../../config';
import Auditor from './Auditor';
import computedAuditors from '../../common/computed/auditors.js';

export default connect({
  certifications: state`App.model.certifications`,
  auditors: computedAuditors,
  fpadDomain: state`Login.fpadDomain`
},

class Auditors extends React.Component {
  renderAuditors = () => {
    let auditors = _.orderBy(this.props.auditors, ['name', 'body'], ['asc', 'asc']);
    return _.map(auditors, (auditor) => {
      return <Auditor key={auditor.key} auditor={auditor} />
    })
  }
  render() {
    let fpadDomain = _.find(oadaDomains, {url: this.props.fpadDomain}).displayText || '';
    return (
      <div className={styles.root}>
        <div className={styles.top}>
          <div className={styles.title}>
            {'Your Auditors:'}
          </div>
          <div className={styles.certCount}>
            {'You have ' + this.props.auditors.length + ' certifications'}
          </div>
        </div>
        <div className={styles.auditorsContainer}>
          {this.renderAuditors()}
        </div>
        <div className={styles.connectionInfo}>
          <SyncIcon color={'#009e0f'}/>
          <div className={styles.label}>
            {'fPAD connection to '+fpadDomain.toLowerCase()}
          </div>
        </div>
      </div>
    )
  }
})
