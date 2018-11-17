import React, { Component } from 'react';
import { Form, Container } from 'semantic-ui-react';
import CustomCalendar from './CustomCalendar';
import CustomTime from './CustomTime';

class AddDiaperForm extends Component {
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
              <label>Time</label>
              <CustomTime />
            </Form.Field>
            <Form.Group inline style={{ marginTop: '30px' }}>
              <label>Type</label>
              <Form.Radio
                label="Poop"
                value="poop"
                checked={value === 'poop'}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="Pee"
                value="pee"
                checked={value === 'pee'}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="Both"
                value="both"
                checked={value === 'both'}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Group>

          <Form.TextArea label="Notes" placeholder="Notes..." />

          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default AddDiaperForm;
