import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton } from 'material-ui'
import _ from 'lodash'

import styles from './index.module.css'


import NewConnection from '../../common/pure-components/NewConnection';
import Connection from '../../common/pure-components/Connection';

export default connect({
  audits: state`app.model.audits`,
  mode: state`app.view.main.mode`,
  newConnections: state`connections.newConnections`,
  connections: state`connections.connections`,
  addConnectionClicked: signal`connections.addConnectionClicked`
},

class Connections extends React.Component {
  getNewConnections = () => {
    return _.map(this.props.newConnections, (connection) => {
      return <div><NewConnection /><Divider /></div>
    });
  }
  getConnections = () => {
    return _.map(this.props.connections, (connection) => {
      return <div><Connection /><Divider /></div>
    });
  }
  render() {
    var connections = this.getConnections();
    var newConnections = this.getNewConnections();
    return (
      <div className={styles.root}>
        <div className={styles.mainPanel}>
          <div className={styles.header}>
            <div className={styles.title}>
              {'Automatic Data Connections'}
            </div>
          </div>
          <Divider/>
          {connections}
          {newConnections}
          {(connections.length > 0 || newConnections.length > 0) ? <Divider /> : null}
          <div className={styles.addConnection} onClick={() => this.props.addConnectionClicked({})}>
            <IconButton
              iconClassName="material-icons">add_circle
            </IconButton>
            <div className={styles.label}>{'Add a Connection'}</div>
          </div>
        </div>
      </div>
    )
  }
})
