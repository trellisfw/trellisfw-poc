import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal, props} from 'cerebral/tags'
import { FlatButton, Card, IconButton, Checkbox } from 'material-ui'
import moment from 'moment'
// eslint-disable-next-line
import styles from './styles.css'

export default connect({
  certification: state`client_panel.clients.${state`client_panel.selected_client`}.certifications.${props`name`}`,
	selected: state`app.view.certifications.${props`name`}.selected`,
	certViewer: state`app.view.certifications.${props`name`}.cert_viewer`,

  checked: signal`app.certChecked`,
	signAuditButtonClicked: signal`app.signAuditButtonClicked`,
	certViewerClicked: signal`app.certViewerClicked`,
},

class CertCard extends React.Component {

  render() {
    let date = new moment(this.props.certification.audit.conditions_during_audit.operation_observed_date).format('MMMM D, YYYY')
    return (
     <Card className={'cert-card'} containerStyle={{display:'flex', flex:'1'}}>
       <div className='left-container'>
         <Checkbox
           label=''
            checked={this.props.selected}
            className={'checkbox'}
            onCheck={(evt, checked) => {this.props.checked({name: this.props.name, checked})}}
          />
        </div>
        <div className='middle-container'>
          <p className={'product-organization'}>{this.props.certification.audit.scope.products_observed[0].name +' - '+this.props.certification.audit.organization.name}</p>
					<div className='score-certlinks'>
						<p className={'score'}>{'Score: '+(100*parseFloat(this.props.certification.audit.score.globalgap_levels.minor_musts.value)).toFixed(1) + ' %'}</p>
						<div className='certlinks'>
							<FlatButton 
								disabled={!this.props.certification.audit}
								label="Audit" 
								className='certlink'
								onTouchTap={() => {this.props.certViewerClicked({name: this.props.name, doc:'audit'})}}
							/>
							<FlatButton 
								disabled={!this.props.certification.corrective_actions}
								label="Corrective Actions" 
								className='certlink'
								onTouchTap={() => {this.props.certViewerClicked({name: this.props.name, doc:'corrective_actions'})}}
							/>
							<FlatButton 
								disabled={!this.props.certification.certificate}
								label="Certificate" 
								className='certlink'
								onTouchTap={() => {this.props.certViewerClicked({name: this.props.name, doc:'certificate'})}}
							/>
						</div>
					</div>
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
            {this.props.certification.audit.signatures ? <div className={'signature'}>
              <IconButton
                className={'valid-icon'}
                style={{color:'#0f0'}}
                iconClassName="material-icons">check_circle
              </IconButton>
              <p className={'valid'}>Signed</p>
            </div>
            :
            <FlatButton
							className={'sign-button'}
							primary={true}
              onTouchTap={()=>{this.props.signAuditButtonClicked({audit:this.props.certification.audit})}}
              label="Finish and sign">
            </FlatButton>}
        </div>
      </Card>
    )
  }
})
