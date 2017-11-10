import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { IconButton, } from 'material-ui'
import AddClientDialog from '../AddClientDialog'
import {tabColor} from '../../config'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
// eslint-disable-next-line
import styles from './index.module.css'

export default connect({
  open: state`ClientPanel.client_dialog.open`,
  client: state`ClientPanel.selected_client`,
  clients: state`ClientPanel.clients`,
  noClientsError: state`ClientPanel.no_clients_error`,

  initialize: signal`ClientPanel.initialize`,
  clientClicked: signal`ClientPanel.clientClicked`,
  addClientButtonClicked: signal`ClientPanel.addClientButtonClicked`,
  shareClientButtonClicked: signal`SharingDialog.shareClientButtonClicked`,
},

class ClientPanel extends React.Component {

  componentWillMount() {
    this.props.initialize({});
  }

  render() {

    return (
      this.props.noClientsError ? <p className={styles['no-clients-error']}>User has no clients</p>
      :
      <Table
        fixedFooter={true}
        selectable={true}
        displayRowCheckbox={false}>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
          style={{height:10}}>
          <TableRow style={{padding:0, height: 10}}>
            <TableHeaderColumn 
              style={{
                textAlign: 'center',
                fontSize: 17,
                color: '#fff',
                backgroundColor: tabColor,
                height: '46px'
              }}>
              <div className={styles['header-row-content']}>
                <p className={styles['row-title']}>Clients</p>
                <IconButton
                  disabled={!this.props.client}
                  iconStyle={{color: this.props.client ? '#fff' : '#0000aa'}}
                  onTouchTap={() => this.props.shareClientButtonClicked({})}
                  iconClassName="material-icons">group
                </IconButton>
              </div>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {_.sortBy(_.map(_.keys(this.props.clients), id => {
              const c = this.props.clients[id];
              c.id = id;
              return c;
            }), 'name').map(c =>
              <TableRow 
                onTouchTap={() => {this.props.clientClicked({id:c.id})}}
                className={styles['row']}
                selected={c.id === this.props.client}
                key={'client-category-'+c.id}>
                <TableRowColumn style={{display: 'flex', cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{textOverflow: 'ellipsis', overflow:'hidden'}}>{c.name}</div>
                  <div>{`(${Object.keys(c.certifications).filter((k) => {return k.charAt(0) !== '_'}).length})`}</div>
                </TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow style={{padding:0, height: 10}}>
            <TableRowColumn style={{padding: 0, textAlign: 'center'}}>
              <div
                onTouchTap={()=>{this.props.addClientButtonClicked({})}}
                className={styles['add-client']}>
                <IconButton
                  iconClassName="material-icons">add_circle
                </IconButton>
                <p>Add new client</p>
                {this.props.open ? <AddClientDialog/> : null }
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
})
