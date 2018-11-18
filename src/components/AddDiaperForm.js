import React, { Component } from 'react';
import { Form, Container } from 'semantic-ui-react';
import CustomCalendar from './CustomCalendar';
import CustomTime from './CustomTime';
import { Redirect } from 'react-router-dom';

class AddDiaperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiapers: [],
      date: '',
      time: '',
      type: '',
      notes: ''
    };
    this.diaperRef = this.props.firebase.database().ref('diapers/');
  }

  handleChangeDate = e => {
    this.setState(
      {
        date: e.target.value
      },
      console.log(this.state)
    );
  };
  handleChangeNotes = e => {
    this.setState(
      {
        notes: e.target.value
      },
      console.log(this.state)
    );
  };
  handleChangeType = e => {
    this.setState(
      {
        type: e.target.value
      },
      console.log(this.state)
    );
  };

  add = (e, { value }) => {
    let amount = this.state.amount;
    if (this.state.expense === 'income') {
      amount = Number(amount);
    } else if (this.state.expense === 'expense') {
      amount = Number(amount) * -1;
    }

    var submitData = {
      date: this.state.date,
      time: this.state.time,
      type: this.state.type,
      notes: this.state.notes
    };

    var newItemKey = this.diaperRef.push().key;
    var updates = {};
    updates['/items/' + newItemKey] = submitData;
    if (
      submitData.amount.length === 0 ||
      submitData.description.length === 0 ||
      submitData.expense === '' ||
      submitData.category === ''
    ) {
      alert('One or more missing fields.');
    } else if (isNaN(submitData.amount)) {
      alert('Cost should be a number.');
    } else if (!isNaN(submitData.description)) {
      alert('Description should be text.');
    } else {
      this.props.firebase
        .database()
        .ref()
        .update(updates);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <Container text>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field onChange={this.handleChangeDate}>
              <label>Date</label>
              <CustomCalendar />
            </Form.Field>
            <Form.Field>
              <label>Time</label>
              <CustomTime onChange={this.onChange} />
            </Form.Field>
            <Form.Group inline style={{ marginTop: '30px' }}>
              <label>Type</label>
              <Form.Radio
                label="Poop"
                value="poop"
                checked={value === 'poop'}
                onChange={this.handleChangeType}
              />
              <Form.Radio
                label="Pee"
                value="pee"
                checked={value === 'pee'}
                onChange={this.handleChangeType}
              />
              <Form.Radio
                label="Both"
                value="both"
                checked={value === 'both'}
                onChange={this.handleChangeType}
              />
            </Form.Group>
          </Form.Group>

          <Form.TextArea
            onChange={this.handleChangeNotes}
            label="Notes"
            placeholder="Notes..."
          />

          <Form.Button content="submit" />
        </Form>
      </Container>
    );
  }
}

export default AddDiaperForm;
