import React from 'react'
import {connect} from 'cerebral/react'
import {state, signal} from 'cerebral/tags'
import { Divider, IconButton } from 'material-ui'
import _ from 'lodash'

import styles from './index.module.css'


import NewConnection from '../../common/components/NewConnection';
import Connection from '../../common/pure-components/Connection';

export default connect({
  newConnections: state`Connections.newConnections`,
  connections: state`Connections.connections`,
  addConnectionClicked: signal`Connections.addConnectionClicked`
},

class Connections extends React.Component {
  getNewConnections = () => {
    return _.map(this.props.newConnections, (connection, id) => {
      return <div key={id}><NewConnection id={id} /><Divider /></div>
    });
  }
  getConnections = () => {
    var i=0;
    return _.map(this.props.connections, (connection) => {
      i++;
      return <div key={i}><Connection connection={connection} /><Divider /></div>
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
          <div className={styles.addConnectionContainer}>
            <span className={styles.addConnection} onClick={() => this.props.addConnectionClicked({})}>
              <IconButton
                iconClassName="material-icons">add_circle
              </IconButton>
              <span className={styles.label}>{'Add a Connection'}</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
})
