import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import { RaisedButton, SelectField, MenuItem } from 'material-ui'
import _ from 'lodash'

import OADAIcon from '../../common/pure-components/OADAIcon'
import styles from './index.module.css'
import {oadaDomains} from '../../config';
import FailDialog from '../FailDialog';

export default connect({
  domain: state`Login.trellisDomain`,
  showFail: state`Login.showFail`,
  connectWithTrellisClicked: signal`Login.connectWithTrellisClicked`,
  trellisDomainChanged: signal`Login.trellisDomainChanged`,
  uploadManuallyClicked: signal`Login.uploadManuallyClicked`
},

class Login extends React.Component {
  onUrlChange = (evt, index, value) => {
    if (value === 'custom') return; //TODO popup
    this.props.trellisDomainChanged({domain: value});
  }
  render() {
    return (
			<div className={styles.root}>
				{this.props.showFail ? <FailDialog /> : null }
        <div className={styles.title}>
          {'You have no certifications. You can:'}
        </div>
        <div className={styles.options}>
					<div className={styles.manualUpload}
					  onClick={() => this.props.uploadManuallyClicked()}>
            {'Upload Certifications Manually'}
          </div>
          <div>{'or'}</div>
          <div className={styles.trellisContainer}>
            <div className={styles.urlContainer}>
              <div>
                {'Your Trellis URL:'}
              </div>
              <div>
                <SelectField
                  value={this.props.domain}
                  onChange={this.onUrlChange}>
                  {
                    _.map(oadaDomains, (domain) => {
                      return <MenuItem key={domain.url} value={domain.url} primaryText={domain.displayText} />
                    })
                  }
                  <MenuItem value={'custom'} primaryText="Custom..." />
                </SelectField>
							</div>
            </div>
            <div>
              <RaisedButton
                backgroundColor="#fff"
                labelStyle={{textTransform: 'none'}}
                label={'Connect with Trellis'}
                icon={<OADAIcon style={{paddingBottom: 1}}/>}
                style={{margin: 12}}
                onClick={() => this.props.connectWithTrellisClicked()}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
