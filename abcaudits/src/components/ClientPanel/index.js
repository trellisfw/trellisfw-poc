import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton, Checkbox } from 'material-ui'
import styles from './styles.css'
import CertCard from '../CertCard'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default connect({
  audits: state`app.model.audits`,
  client: state`app.view.main_panel.client`,
  clientClicked: signal`app.clientClicked`,
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
      </Table>
    )
  }
})
