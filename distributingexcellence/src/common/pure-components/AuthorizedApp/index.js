import React from 'react'
import _ from 'lodash';
import styles from './index.module.css'
import svgAuthorizedApp from '../../svg/authorizedApp.svg'

import svgABC from '../../svg/domains/abcAudits.svg'
import svgGrowerSync from '../../svg/domains/growerSync.svg'
import svgRetailFresh from '../../svg/domains/retailFresh.svg'
import svgPSP from '../../svg/domains/pspPerfection.svg'
import svgAuditorMining from '../../svg/domains/auditorMining.svg'
import svgDistributing from '../../svg/domains/distributingExcellence.svg'

class NewConnection extends React.Component {
  render() {
    let logo = svgABC;
    let name = _.get(this.props.app, 'client.client_name') || '';
    if (name.toLowerCase().indexOf('abcaudits') !== -1) {
      logo = svgABC;
      name = 'ABC Audits';
    } else if (name.toLowerCase().indexOf('growersync') !== -1) {
      logo = svgGrowerSync;
      name = 'GrowerSync';
    } else if (name.toLowerCase().indexOf('retailfresh') !== -1) {
      logo = svgRetailFresh;
      name = 'RetailFresh';
    } else if (name.toLowerCase().indexOf('pspperfection') !== -1) {
      logo = svgPSP;
      name = 'PSP Perfection';
    } else if (name.toLowerCase().indexOf('auditormining') !== -1) {
      logo = svgAuditorMining;
      name = 'AuditorMining';
    } else if (name.toLowerCase().indexOf('distributing') !== -1) {
      logo = svgDistributing;
      name = 'DistributingExcellence';
    }

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.label}>
            {'Connection Type'}
          </div>
          <div>
            <img src={svgAuthorizedApp} className={styles.typeIcon} alt="Authorized App" />
          </div>
          <div className={styles.label}>
            {'Authorized App'}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.leftSide}>
            <div className={styles.iconContainer}>
                <img src={logo} className={styles.nameIcon} alt="name" />
                <div>{name}</div>
            </div>
            <div className={styles.status}>
              <a href="">{'Privacy and Use Statement'}</a>
            </div>
            <div className={styles.updatedContainer}>
              <div className={styles.label}>
                {'Expires:'}
              </div>
              <div className={styles.time}>
                {' Never'}
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
