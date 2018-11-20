import React, { Component } from 'react';
import { Form, Container, Radio, Label } from 'semantic-ui-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import dateTime from '../dateTime';

class AddFeedingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFeedings: [],
      date: new Date(),
      started: new Date(),
      finished: new Date(),

      LorR: '',
      notes: ''
    };

    this.feedingRef = this.props.firebase.database().ref('feedings/');
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  onDateChange = date => this.setState({ date });
  onStartedChange = started => this.setState({ started });
  onFinishedChange = finished => this.setState({ finished });

  handleSubmitFeeding = () => {
    var submitData = {
      date: dateTime.date(this.state.date),
      started: dateTime.time(this.state.started),
      finished: dateTime.time(this.state.finished),
      duration: dateTime.duration(this.state.started, this.state.finished),
      LorR: this.state.LorR,
      notes: this.state.notes
    };

    var newFeedingKey = this.feedingRef.push().key;
    var updates = {};
    updates['/feedings/' + newFeedingKey] = submitData;
    if (
      submitData.start === '' ||
      submitData.finish === '' ||
      submitData.LorR === ''
    ) {
      alert('You have to fill out start/finish/side.');
    } else {
      this.props.firebase
        .database()
        .ref()
        .update(updates);
      this.props.history.push('/feedings');
    }
  };

  render() {
    const { notes } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmitFeeding}>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Date</Label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onDateChange}
            />
          </Form.Group>

          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Start</Label>
            <DatePicker
              selected={this.state.started}
              onChange={this.onStartedChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
          </Form.Group>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Finish</Label>

            <DatePicker
              selected={this.state.finished}
              onChange={this.onFinishedChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
          </Form.Group>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Side</Label>
            <Form.Field>
              <Radio
                toggle
                label="Left"
                name="LorR"
                value="Left"
                checked={this.state.LorR === 'Left'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                toggle
                label="Right"
                name="LorR"
                value="Right"
                checked={this.state.LorR === 'Right'}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal" style={{ paddingTop: '10px' }}>
            {/* <Form.Input
              placeholder="Duration"
              name="duration"
              value={duration}
              onChange={this.handleChange}
            /> */}
            <Form.Input
              placeholder="Notes (optional)"
              name="notes"
              value={notes}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content="submit" />
        </Form>
      </Container>
    );
  }
}

export default AddFeedingForm;
