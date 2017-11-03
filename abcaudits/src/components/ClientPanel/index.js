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
  open: state`client_panel.client_dialog.open`,
  client: state`client_panel.selected_client`,
	clients: state`client_panel.clients`,
	noClientsError: state`client_panel.no_clients_error`,

  initialize: signal`client_panel.initialize`,
  clientClicked: signal`client_panel.clientClicked`,
  addClientButtonClicked: signal`client_panel.addClientButtonClicked`,
	shareClientButtonClicked: signal`SharingDialog.shareClientButtonClicked`,
},

class ClientPanel extends React.Component {

  componentWillMount() {
    this.props.initialize({});
  }

	render() {

		return (
			this.props.noClientsError ? <p className='no-clients-error'>User has no clients</p>
			:
      <Table
        fixedFooter={true}
        selectable={true}
        displayRowCheckbox={false}>
        <TableHeader
          displaySelectAll={false}>
          <TableRow className='clients-panel-header'>
						<TableHeaderColumn 
							className='client-panel-clients-header'>
							<p className='category-title'>Clients</p>
						  <IconButton
						    disabled={!this.props.client}
						    className='client-panel-share-button'
						    onTouchTap={() => this.props.shareClientButtonClicked({})}
						    iconClassName="material-icons">group
						  </IconButton>
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
								className={'row'}
								selected={c.id === this.props.client}
								key={'client-category-'+c.id}>
								<TableRowColumn>
									<div className={'rowtext'}>
										<p className={'category-title'}>{c.name}</p>
										<p>{`(${Object.keys(c.certifications).filter((k) => {return k.charAt(0) !== '_'}).length})`}</p>
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
