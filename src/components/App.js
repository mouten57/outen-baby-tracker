import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Landing from './Landing';
import Diapers from './Diapers';
import Feedings from './Feedings';
import AddDiaperForm from './AddDiaperForm';
import AddFeedingForm from './AddFeedingForm';

import firebase from 'firebase/app';
import 'firebase/database';

import config from '../firebaseConfig';

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiapers: [],
      allFeedings: []
    };
    this.diapersRef = firebase.database().ref('diapers/');
    this.feedingsRef = firebase.database().ref('feedings/');
  }

  componentDidMount() {
    this.diapersRef.on('child_added', snapshot => {
      const diaper = snapshot.val();
      diaper.key = snapshot.key;
      let diapers = this.state.allDiapers.concat(diaper);
      this.setDiapers(diapers);
    });
    this.feedingsRef.on('child_added', snapshot => {
      const feeding = snapshot.val();
      feeding.key = snapshot.key;
      let feedings = this.state.allFeedings.concat(feeding);
      this.setFeedings(feedings);
    });
  }

  setDiapers = diapers => {
    this.setState({ allDiapers: diapers });
  };

  setFeedings = feedings => {
    this.setState({ allFeedings: feedings });
  };

  render() {
    console.log(this.state)
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Menu />
            <Route
              exact
              path="/"
              render={props => <Landing {...props} firebase={firebase} />}
            />
            <Route
              exact
              path="/diapers"
              render={props => (
                <Diapers
                  {...props}
                  firebase={firebase}
                  diapers={this.state.allDiapers}
                />
              )}
            />
            <Route
              exact
              path="/diapers/add"
              render={props => <AddDiaperForm {...props} firebase={firebase} />}
            />
            <Route
              exact
              path="/feedings"
              render={props => (
                <Feedings
                  {...props}
                  firebase={firebase}
                  feedings={this.state.allFeedings}
                />
              )}
            />
            <Route
              exact
              path="/feedings/add"
              render={props => (
                <AddFeedingForm {...props} firebase={firebase} />
              )}
            />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
