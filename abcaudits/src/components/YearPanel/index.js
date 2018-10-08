import React from 'react'
import {connect} from '@cerebral/react'
import {state, signal} from 'cerebral/tags'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
// eslint-disable-next-line
import styles from './styles.css'

export default connect({
  audits: state`model.audits`,
  yearClicked: signal`yearClicked`,
},

class YearPanel extends React.Component {

  render() {
    let years = {}
    Object.keys(this.props.audits).map((key, i) => {
      if (years[this.props.audits[key].expiration]) {
        return years[this.props.audits[key].expiration]++ 
      } else {
        return years[this.props.audits[key].expiration] = 1;
      }
    })

    return (
      <Table>
        displayRowCheckbox={false}>
        <TableHeader
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Year</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          stripedRows={true}
          displayRowCheckbox={false}>
          {Object.keys(years).map(year =>
            <TableRow 
              className={'row'}
              key={'year-category-'+year}>
              <TableRowColumn
                onClick={() => {this.props.yearCategoryClicked({})}}>
                <div className={'rowtext'}>
                  <p className={'category-title'}>{`${year}}</p>
                  <p>{(${years[year]})`}</p>
                </div>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
})
