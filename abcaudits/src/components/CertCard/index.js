import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal, props} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import styles from './styles.css'

export default connect({
  audit: state`app.model.audits.${props`name`}`,
},

class CertCard extends React.Component {

  render() {

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
          <p className={'score'}>{'Score: '+this.props.audit.score}</p>
          <p className={'product-organization'}>{this.props.audit.product +' - '+this.props.audit.organization}</p>
          <div className={'sync-info'}>
            <IconButton
              className={'sync-icon'}
              iconClassName="material-icons">cached
            </IconButton>
            <p className={'from'}>{'from '+this.props.audit.organization}</p>
          </div>
        </div>
        <div className='right-container'>
          <p className={'expiration'}>{this.props.audit.expiration}</p>
            <IconButton
              className={'valid-icon'}
              iconClassName="material-icons">check_circle
            </IconButton>
          <p className={'valid'}>{this.props.audit.valid ? 'Signature valid' : 'Signature invalid!'}</p>
        </div>
        <hr />
      </div>
    )
  }
})
