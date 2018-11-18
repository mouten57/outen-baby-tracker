import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import AddButton from './AddButton';
import _ from 'lodash';

class Feedings extends Component {
  state = {
    column: null,
    data: [],
    direction: null
  };

  componentDidMount() {
    this.setState({ data: this.props.feedings });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.feedings });
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
        <h2 style={{ display: 'inline-block', marginTop: '3px' }}>Feedings</h2>
        <AddButton link="/feedings/add" />
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
                sorted={column === 'started' ? direction : null}
                onClick={this.handleSort('started')}
              >
                Started
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'finished' ? direction : null}
                onClick={this.handleSort('finished')}
              >
                Finished
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'duration' ? direction : null}
                onClick={this.handleSort('duration')}
              >
                Duration
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'LorR' ? direction : null}
                onClick={this.handleSort('LorR')}
              >
                Boob
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
            {_.map(
              data,
              ({ key, date, started, finished, duration, LorR, notes }) => (
                <Table.Row key={key}>
                  <Table.Cell>{date}</Table.Cell>
                  <Table.Cell>{started}</Table.Cell>
                  <Table.Cell>{finished}</Table.Cell>
                  <Table.Cell>{duration}</Table.Cell>
                  <Table.Cell>{LorR}</Table.Cell>
                  <Table.Cell>{notes}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Feedings;
