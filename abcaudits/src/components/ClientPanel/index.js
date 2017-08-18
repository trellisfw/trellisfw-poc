import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import styles from './styles.css'
import CertCard from '../CertCard'
import AddClientDialog from './AddClientDialog'
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
  audits: state`app.model.audits`,
  client: state`client_panel.client`,
  clientClicked: signal`client_panel.clientClicked`,
},

class ClientPanel extends React.Component {

  render() {

    let clients = {}
    Object.keys(this.props.audits).map((key, i) => {
      if (clients[this.props.audits[key].organization.contacts[0].name]) {
        clients[this.props.audits[key].organization.contacts[0].name]++
      } else {
        clients[this.props.audits[key].organization.contacts[0].name] = 1;
      }
    })

    return (
      <Table>
        fixedFooter={true}
        displayRowCheckbox={false}>
        <TableHeader
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Clients</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows={true}
          displayRowCheckbox={false}>
          {Object.keys(clients).map(client =>
            <TableRow 
              onTouchTap={() => {this.props.clientClicked({client})}}
              className={'row'}
              selected={client === this.props.client}
              key={'client-category-'+client}>
              <TableRowColumn>
                <div className={'rowtext'}>
                  <p className={'category-title'}>{client}</p>
                  <p>{`(${clients[client]})`}</p>
                </div>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn style={{textAlign: 'center'}}>
                <IconButton iconClassName="muidocs-icon-custom-add_circle" />
                Add new client
              </TableRowColumn>
            </TableRow>
          </TableFooter>
      </Table>
    )
  }
})
