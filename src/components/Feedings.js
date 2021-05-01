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
    const data = this.props.feedings.reverse()
    this.setState({ data });

  }
  componentWillReceiveProps(nextProps) {
    const data = nextProps.feedings.reverse()
    this.setState({ data });


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
    console.log(this.state)
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
                sorted={column === 'totalL' ? direction : null}
                onClick={this.handleSort('totalL')}
              >
               Total Left (min)
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'totalR' ? direction : null}
                onClick={this.handleSort('totalR')}
              >
                Total Right (min)
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
              ({ key, date, totalInputLeft, totalInputRight, notes }) => (
                <Table.Row key={key}>
                  <Table.Cell>{date}</Table.Cell>
                  <Table.Cell>{totalInputLeft}</Table.Cell>
                  <Table.Cell>{totalInputRight}</Table.Cell>
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
