import React, { Component } from 'react';
import { Form, Container, Label, Radio } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import dateTime from '../dateTime';

class AddDiaperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiapers: [],
      date: new Date(),
      time: new Date(),
      type: '',
      notes: ''
    };
    this.diaperRef = this.props.firebase.database().ref('diapers/');
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  onDateChange = date => this.setState({ date });
  onTimeChange = time => this.setState({ time });

  handleSubmitDiaper = () => {
    var submitData = {
      date: dateTime.date(this.state.date),
      time: dateTime.time(this.state.time),
      type: this.state.type,
      notes: this.state.notes
    };

    var newDiaperKey = this.diaperRef.push().key;
    var updates = {};
    updates['/diapers/' + newDiaperKey] = submitData;
    if (
      submitData.date === '' ||
      submitData.time === '' ||
      submitData.type === ''
    ) {
      alert('You have to fill out date/time/type.');
    } else {
      this.props.firebase
        .database()
        .ref()
        .update(updates);
      this.props.history.push('/diapers');
    }
  };

  render() {
    const { notes } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmitDiaper}>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Date</Label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onDateChange}
            />
          </Form.Group>

          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Time</Label>
            <DatePicker
              selected={this.state.time}
              onChange={this.onTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
          </Form.Group>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Type</Label>
            <Form.Field>
              <Radio
                toggle
                label="Poop"
                name="type"
                value="Poop"
                checked={this.state.type === 'Poop'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                toggle
                label="Pee"
                name="type"
                value="Pee"
                checked={this.state.type === 'Pee'}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Input
            placeholder="Notes (optional)"
            name="notes"
            style={{ paddingTop: '10px' }}
            value={notes}
            onChange={this.handleChange}
          />

          <Form.Button content="submit" />
        </Form>
      </Container>
    );
  }
}

export default AddDiaperForm;
