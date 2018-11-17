import React, { Component } from 'react';
import { Form, Container } from 'semantic-ui-react';
import CustomCalendar from './CustomCalendar';
import CustomTime from './CustomTime';

const options = [
  { key: '5', text: '5 minutes', value: '5' },
  { key: '10', text: '10 minutes', value: '10' },
  { key: '15', text: '15 minutes', value: '15' },
  { key: '20', text: '20 minutes', value: '20' },
  { key: '25', text: '25 minutes', value: '25' },
  { key: '30', text: '30 minutes', value: '30' },
  { key: '35', text: '35 minutes', value: '35' },
  { key: '40', text: '40 minutes', value: '40' }
];

class AddFeedingForm extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <Container text>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Date</label>
              <CustomCalendar />
            </Form.Field>
            <Form.Field>
              <label>Start Time</label>
              <CustomTime />
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
              <CustomTime />
            </Form.Field>

            <Form.Select
              label="Duration"
              options={options}
              placeholder="Duration"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Boob</label>
            <Form.Radio
              label="Left"
              value="left"
              checked={value === 'left'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Right"
              value="right"
              checked={value === 'right'}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Both"
              value="both"
              checked={value === 'both'}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.TextArea label="Notes" placeholder="Notes..." />

          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default AddFeedingForm;
