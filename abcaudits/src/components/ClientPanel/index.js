import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import { IconButton, } from 'material-ui'
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
// eslint-disable-next-line
import styles from './styles.css'

export default connect({
  open: state`clients.client_dialog.open`,
  client: state`clients.selected_client`,
	clients: state`clients.records.**`,
  connection_id: state`clients.connection_id`,

  clientClicked: signal`clients.clientClicked`,
  addClientButtonClicked: signal`clients.addClientButtonClicked`,
	shareClientButtonClicked: signal`sharing_dialog.shareClientButtonClicked`,
},

class ClientPanel extends React.Component {

  render() {

		return (
      <Table
        fixedFooter={true}
        selectable={true}
        displayRowCheckbox={false}>
        <TableHeader
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Clients</TableHeaderColumn>
            <TableHeaderColumn>
						  <IconButton
						    disabled={!this.props.client}
						    className='client-panel-share-button'
                onTouchTap={() => this.props.shareClientButtonClicked({
                  metaPath:`/bookmarks/trellisfw/clients/${this.props.client}/certifications/_meta/_permissions`,
                  connection_id: this.props.connection_id,
                })}
						    iconClassName="material-icons">group
						  </IconButton>
						</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          displayRowCheckbox={false}>
          {_.sortBy(_.map(_.filter(_.keys(this.props.clients), key => key.charAt(0) !== '_'), id => {
							const c = this.props.clients[id];
							c.id = id;
							return c;
						}), 'name').map(c =>
							<TableRow 
								onTouchTap={() => {this.props.clientClicked({clientId:c.id})}}
								className={'row'}
								selected={c.id === this.props.client}
								key={'client-category-'+c.id}>
								<TableRowColumn>
									<div className={'rowtext'}>
										<p className={'category-title'}>{c.name}</p>
										<p>{`(${Object.keys(c.certifications || {}).filter((k) => {return k.charAt(0) !== '_'}).length})`}</p>
									</div>
								</TableRowColumn>
							</TableRow>
						)
					}
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
