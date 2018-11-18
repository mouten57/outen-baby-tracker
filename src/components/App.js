import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Landing from './Landing';
import Diapers from './Diapers';
import Feedings from './Feedings';
import AddDiaperForm from './AddDiaperForm';
import AddFeedingForm from './AddFeedingForm';
import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDPAkMHw0FXy6Ix4-OrqtkgPIjWb2qS-Vc',
  authDomain: 'baby-app-199fa.firebaseapp.com',
  databaseURL: 'https://baby-app-199fa.firebaseio.com',
  projectId: 'baby-app-199fa',
  storageBucket: 'baby-app-199fa.appspot.com',
  messagingSenderId: '643236783327'
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiapers: [],
      allFeedings: []
    };
    this.diapersRef = firebase.database().ref('diapers/');
  }

  componentDidMount() {
    this.diapersRef.on('child_added', snapshot => {
      const diaper = snapshot.val();
      diaper.key = snapshot.key;
      let diapers = this.state.allDiapers.concat(diaper);
      this.setDiapers(diapers);
    });
  }

  setDiapers = diapers => {
    this.setState({ allDiapers: diapers });
    console.log(this.state.allDiapers);
  };

  render() {
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
              render={props => <Feedings {...props} firebase={firebase} />}
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
