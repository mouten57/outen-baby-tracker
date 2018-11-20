import React, { Component } from 'react';
import { Form, Container } from 'semantic-ui-react';
import dateTime from '../dateTime';

class AddDiaperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiapers: [],
      date: dateTime.date(Date.now()),
      time: dateTime.time(Date.now()),
      type: '',
      notes: ''
    };
    this.diaperRef = this.props.firebase.database().ref('diapers/');
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmitDiaper = () => {
    var submitData = {
      date: this.state.date,
      time: this.state.time,
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
    const { date, time, type, notes } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmitDiaper}>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Date"
              name="date"
              value={date}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Time"
              name="time"
              value={time}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Type"
              name="type"
              value={type}
              onChange={this.handleChange}
            />
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

export default AddDiaperForm;
