import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import CertCard from '../CertCard'
import ClientPanel from '../ClientPanel'
import YearPanel from '../YearPanel'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import styles from './styles.css'

export default connect({
  audits: state`app.model.audits`,
  mode: state`app.view.main_panel.mode`,
  client: state`app.view.main_panel.client`,
  certsToShow: state`app.view.main_panel.certs.certs_to_show`,

  initialize: signal`app.initialize`,
  addCertButtonClicked: signal`app.addCertButtonClicked`,
},

class App extends React.Component {

  componentWillMount() {
    this.props.initialize({})
  }

  render() {

    let years = {}
    let certs = Object.keys(this.props.certsToShow).map((key, i) => {
      return <div key={'cert-hr-container'+i}>
        <CertCard name={key} key={'cert-'+i}/>
        <hr/>
      </div>
    })

    return (
      <div className='app'>
        <div 
          style={{}}
          className='header'>
          <div className='header-left'>
            <h1>ABC Audits</h1>
            <IconButton
              iconClassName="material-icons">store
            </IconButton>
            Audits done right!
          </div>
          <div
            className='header-right'>
            <div
              className='profile-container'>
              Ron Retailer
              <IconButton
                iconClassName="material-icons">account_circle
              </IconButton>
            </div>
            {false ? <div className='modes'>
              <p 
                className={this.props.mode === 'connections' ? 'highlighted-mode' : 'mode'}
                onClick={()=>{this.props.modeClicked({mode: 'connections'})}}>
                <u>Connections</u>
              </p>
              <p 
                className={this.props.mode === 'certifications' ? 'highlighted-mode' : 'mode'}
                onClick={()=>{this.props.modeClicked({mode: 'certifications'})}}>
                <u>Certifications</u>
              </p>
            </div> : null}
          </div>
        </div>
        <div className='lower'>
          <div className='left-panel'>
            <ClientPanel className='left-panel' />
          </div>
          <div className='main-panel'>
            <div className='main-panel-header'>
              <p className={'main-panel-header-text'}>Current Certifications</p>
              <IconButton
                disabled={true}
                className='main-panel-delete-button'
                iconClassName="material-icons">delete
              </IconButton>
              <IconButton
                disabled={true}
                className='main-panel-share-button'
                iconClassName="material-icons">group
              </IconButton>
            </div>
            <hr />
            {certs}
            {true ? 
            (true /*this.props.client*/ ? <div
              onClick={()=> this.props.addCertButtonClicked({})}
              className='main-panel-add-cert'>
              <IconButton
                iconClassName="material-icons">add_circle
              </IconButton> 
              <p>New Certification</p>
            </div> : null)
            : null }
          </div>
        </div>
      </div>
    )
  }
})
