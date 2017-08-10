import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import styles from './styles.css'
import moment from 'moment'

export default connect({
  audit: state`app.model.audits.${props`name`}`,
},

class CertCard extends React.Component {

  render() {
    let date = new moment(this.props.audit.conditions_during_audit.operation_observed_date).format('MMMM D, YYYY')
    console.log(date)

    return (
     <div className='cert-card'>
       <div className='left-container'>
         <Checkbox
           label=''
            checked={false}
            className={'checkbox'}
          />
        </div>
        <div className='middle-container'>
          <p className={'score'}>{'Score: '+(100*parseFloat(this.props.audit.score.globalgap_levels.minor_musts.value)).toFixed(1) + ' %'}</p>
          <p className={'product-organization'}>{this.props.audit.scope.products_observed[0].name +' - '+this.props.audit.organization.contacts[0].name}</p>
          {false ? <div className={'sync-info'}>
            <IconButton
              className={'sync-icon'}
              iconClassName="material-icons">cached
            </IconButton>
            <p className={'from'}>{'from '}</p>
          </div> : null }
        </div>
        <div className='right-container'>
          <p className={'expiration'}>{date}</p>
            {this.props.audit.valid ? <IconButton
              className={'valid-icon'}
              iconClassName="material-icons">check_circle
            </IconButton>
            : 
            <IconButton
              className={'valid-icon'}
              iconClassName="material-icons">cancel
            </IconButton>}
          <p className={'valid'}>{this.props.audit.valid ? 'Signature valid' : 'Signature invalid!'}</p>
        </div>
      </div>
    )
  }
})
