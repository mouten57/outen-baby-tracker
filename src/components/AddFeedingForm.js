import React, { Component } from 'react';
import { Form, Container, Radio, Label, Grid, Divider } from 'semantic-ui-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import dateTime from '../dateTime';

class AddFeedingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFeedings: [],
      date: new Date(),
      startedL: new Date(),
      finishedL: new Date(),
      startedR: new Date(),
      finishedR: new Date(),
      totalInputLeft: "",
      totalInputRight:"",
      notes: ''
    };

    this.feedingRef = this.props.firebase.database().ref('feedings/');
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  onDateChange = date => this.setState({ date });
  onStartedChange = (started, side) => { side=="L" ? this.setState({ startedL: started }) : this.setState({ startedR: started })};
  onFinishedChange = (finished, side) => { side=="L" ? this.setState({ finishedL: finished }) : this.setState({ finishedR: finished })};

  handleSubmitFeeding = () => {
    const {date, startedL, finishedL, startedR, finishedR, totalInputLeft, totalInputRight, notes} = this.state
    var submitData = {
      date: dateTime.date(date),
      startedL: dateTime.time(startedL),
      finishedL: dateTime.time(finishedL),
      startedR: dateTime.time(startedR),
      finishedR: dateTime.time(finishedR),
      totalInputLeft: totalInputLeft == "" ? dateTime.duration(startedL, finishedL) : totalInputLeft,
      totalInputRight: totalInputRight == "" ? dateTime.duration(startedR, finishedR) : totalInputRight,
      notes
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
    console.log(this.state)
    const { notes, totalInputLeft, totalInputRight } = this.state;
    return (
      <Container stretched>
        <Form onSubmit={this.handleSubmitFeeding}>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Date</Label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onDateChange}
            />
          </Form.Group>
<Divider />
<Grid columns={2} divided >
<Grid.Row stretched>

      <Grid.Column>
      <Label color='pink'size='big'> Left</Label>
      </Grid.Column>
      <Grid.Column>
      <Label color='blue' size='big'>Right</Label>
      </Grid.Column>
  </Grid.Row>

  <Grid.Row stretched>
  <Grid.Column>

  <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Start</Label>
            <DatePicker
              selected={this.state.startedL}
              onChange={(time)=> this.onStartedChange(time, 'L')}
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
              selected={this.state.finishedL}
              onChange={(time)=>this.onFinishedChange(time, 'L')}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />

          </Form.Group>
          </Grid.Column>

          <Grid.Column>
          <Form.Group style={{ paddingTop: '10px' }}>
            <Label>Start</Label>
            <DatePicker
              selected={this.state.startedR}
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
              selected={this.state.finishedR}
              onChange={this.onFinishedChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />

          </Form.Group>
          </Grid.Column>

  </Grid.Row>
  <Grid.Row>
    <Grid.Column>
    <Divider horizontal>Or</Divider>
    <Form.Group widths='equal'>
    <Form.Input
              placeholder="Total Time"
              name="totalInputLeft"
              value={totalInputLeft}
              onChange={this.handleChange}
              stretched
             style={{height: '60px'}}

            />
    </Form.Group>
    </Grid.Column>
    <Grid.Column>
    <Divider horizontal>Or</Divider>
    <Form.Group widths='equal'>
    <Form.Input
              placeholder="Total Time"
              name="totalInputRight"
              value={totalInputRight}
              onChange={this.handleChange}
              stretched
             style={{height: '60px'}}

            />
    </Form.Group>
    </Grid.Column>
  </Grid.Row>

</Grid>



          <Form.Group widths="equal" style={{ paddingTop: '10px' }}>
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
