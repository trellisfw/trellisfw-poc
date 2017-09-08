import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import styles from './styles.css'
import CertCard from '../CertCard'
import AddClientDialog from './AddClientDialog'
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

export default connect({
  open: state`client_panel.client_dialog.open`,
  audits: state`app.model.audits`,
  client: state`client_panel.selected_client`,
  clients: state`client_panel.clients`,

  initialize: signal`client_panel.initialize`,
  clientClicked: signal`client_panel.clientClicked`,
  addClientButtonClicked: signal`client_panel.addClientButtonClicked`,
},

class ClientPanel extends React.Component {

  componentWillMount() {
    this.props.initialize({});
  }

  render() {
    let clients = _.map(_.keys(this.props.clients), id => {
      const c = this.props.clients[id];
      c.id = id;
      return c;
    });
    clients = _.sortBy(clients, 'name')

    return (
      <Table
        fixedFooter={true}
        selectable={true}
        displayRowCheckbox={false}>
        <TableHeader
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Clients</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {clients.map(c => {
            return <TableRow 
              onTouchTap={() => {this.props.clientClicked({id:c.id})}}
              className={'row'}
              selected={c.id === this.props.client}
              key={'client-category-'+c.id}>
              <TableRowColumn>
                <div className={'rowtext'}>
                  <p className={'category-title'}>{c.name}</p>
                  <p>{`(${Object.keys(c.certifications).length})`}</p>
                </div>
              </TableRowColumn>
            </TableRow> }
          )}
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn style={{textAlign: 'center'}}>
              <div
                onTouchTap={()=>{this.props.addClientButtonClicked({})}}
                className={"add-client"}>
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
