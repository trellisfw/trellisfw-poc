import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal, props} from 'cerebral/tags'
import { FlatButton, Card, IconButton, Checkbox } from 'material-ui'
import moment from 'moment'
// eslint-disable-next-line
import styles from './styles.css'
import JSONTree from 'react-json-tree'

export default connect({
  certification: state`view.certifications.${props`certId`}`,
  audit: state`view.certifications.${props`certId`}.audit`,
	selected: state`view.certifications.${props`certId`}.selected`,
	certViewer: state`view.certifications.${props`certId`}.cert_viewer`,

  checked: signal`clients.certChecked`,
	signAuditButtonClicked: signal`clients.signAuditButtonClicked`,
	certViewerClicked: signal`certifications.certViewerClicked`,
	closeViewer: signal`certifications.closeViewerClicked`,
},

class CertCard extends React.Component {

  render() {
		let date = new moment(this.props.audit.conditions_during_audit.operation_observed_date).format('MMMM D, YYYY')
    return (
     <Card className='cert-card'>
       <div className='main-content'>
       <div className='left-container'>
         <Checkbox
           label=''
            checked={this.props.selected ? true : false}
            className={'checkbox'}
            onCheck={(evt, checked) => {this.props.checked({certId: this.props.certId, checked})}}
          />
        </div>
        <div className='middle-container'>
          <p className={'product-organization'}>{this.props.audit.scope.products_observed[0].name +' - '+this.props.audit.organization.name}</p>
					<div className='score-certlinks'>
						<p className={'score'}>{'Score: '+(100*parseFloat(this.props.audit.score.globalgap_levels.minor_musts.value)).toFixed(1) + ' %'}</p>
						<div className='certlinks'>
							<FlatButton 
								disabled={!this.props.audit}
								label="Audit" 
								className='certlink'
								onTouchTap={() => {this.props.certViewerClicked({certId:this.props.certId, doc:'audit'})}}
							/>
							<FlatButton 
								disabled={!this.props.certification.corrective_actions}
								label="Corrective Actions" 
								className='certlink'
								onTouchTap={() => {this.props.certViewerClicked({certId:this.props.certId, doc:'corrective_actions'})}}
							/>
							<FlatButton 
								disabled={!this.props.certification.certificate}
								label="Certificate" 
								className='certlink'
								onTouchTap={() => {this.props.certViewerClicked({certId:this.props.certId, doc:'certificate'})}}
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
            {this.props.audit.signatures ? <div className={'signature'}>
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
              onTouchTap={()=>{this.props.signAuditButtonClicked({audit:this.props.audit, certId: this.props.certId})}}
              label="Finish and sign">
            </FlatButton>}
        </div>
        </div>
				{this.props.certViewer ? <div className='expandable-doc-viewer'>
          <FlatButton
            onTouchTap={()=>{this.props.closeViewer({certId:this.props.certId})}}
            label="Close Viewer">
            </FlatButton>
				 <JSONTree data={this.props.audit} theme={"summerfruit:inverted"} />
			 </div> : null }
      </Card>
    )
  }
})
