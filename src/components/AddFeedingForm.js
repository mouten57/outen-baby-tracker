import React, { Component } from 'react';
import { Form, Container, Radio } from 'semantic-ui-react';
import dateTime from '../dateTime';

class AddFeedingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFeedings: [],
      date: dateTime.date(Date.now()),
      started: dateTime.time(Date.now()),
      finished: '',
      duration: '',
      LorR: '',
      notes: ''
    };
    this.feedingRef = this.props.firebase.database().ref('feedings/');
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmitFeeding = () => {
    var submitData = {
      date: this.state.date,
      started: this.state.started,
      finished: this.state.finished,
      duration: this.state.duration,
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
    const { date, started, finished, duration, notes } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmitFeeding}>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Date"
              name="date"
              value={date}
              onChange={this.handleChange}
            />
            {/* <Form.Input
              placeholder="Left or Right"
              name="LorR"
              value={LorR}
              onChange={this.handleChange}
            /> */}

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
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Start"
              name="started"
              value={started}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Finish"
              name="finished"
              value={finished}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="Duration"
              name="duration"
              value={duration}
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

export default AddFeedingForm;
