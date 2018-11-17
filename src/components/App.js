import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Menu from './Menu';
import Landing from './Landing';
import Diapers from './Diapers';
import Feedings from './Feedings';
import AddDiaperForm from './AddDiaperForm';
import AddFeedingForm from './AddFeedingForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDiapers: [],
      allFeedings: []
    };
  }
  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Menu />
            <Route exact path="/" component={Landing} />
            <Route exact path="/diapers" component={Diapers} />
            <Route exact path="/diapers/add" component={AddDiaperForm} />
            <Route exact path="/feedings" component={Feedings} />
            <Route exact path="/feedings/add" component={AddFeedingForm} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
