import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import AddButton from './AddButton';
import _ from 'lodash';

const tableData = [
  { id: 1, date: '11/15/19', time: '1:35PM', type: 'poop', notes: 'none' },
  { id: 2, date: '11/16/19', time: '2:35PM', type: 'pee', notes: 'none' },
  { id: 3, date: '11/17/19', time: '3:35PM', type: 'poop', notes: 'none' },
  { id: 4, date: '11/18/19', time: '4:35PM', type: 'pee', notes: 'none' },
  { id: 5, date: '11/19/19', time: '5:35PM', type: 'poop', notes: 'none' },
  { id: 6, date: '11/20/19', time: '6:35PM', type: 'both', notes: 'none' }
];

class Diapers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: tableData,
      direction: null,
      allDiapers: []
    };
  }

  componentDidMount() {
    console.log(this.props.diapers);
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };
  render() {
    const { column, data, direction } = this.state;
    return (
      <div>
        <h2 style={{ display: 'inline-block', marginTop: '3px' }}>Diapers</h2>
        <AddButton link="/diapers/add" />
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'date' ? direction : null}
                onClick={this.handleSort('date')}
              >
                Date
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'time' ? direction : null}
                onClick={this.handleSort('time')}
              >
                Time
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'type' ? direction : null}
                onClick={this.handleSort('type')}
              >
                Poop/Pee
              </Table.HeaderCell>

              <Table.HeaderCell
                sorted={column === 'notes' ? direction : null}
                onClick={this.handleSort('notes')}
              >
                Notes
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, date, time, type, notes }) => (
              <Table.Row key={id}>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell>{type}</Table.Cell>
                <Table.Cell>{notes}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Diapers;
