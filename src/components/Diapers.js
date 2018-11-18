import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import AddButton from './AddButton';
import _ from 'lodash';

class Diapers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.diapers });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.diapers });
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
                Type (poop/pee)
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
            {_.map(data, ({ key, date, time, type, notes }) => (
              <Table.Row key={key}>
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
