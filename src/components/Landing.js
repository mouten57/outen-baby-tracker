import React from 'react';

import { Container, Image } from 'semantic-ui-react';

const Landing = () => (
  <Container>
    <Container text centered>
      <h2> Baby Tracker!</h2>
      <p>Keeping track of baby Monroe</p>
    </Container>
    <Image
      style={{ marginTop: '10px' }}
      src="https://i.imgur.com/aUEr4kn.png"
      size="large"
      bordered
      centered
      circular
    />
  </Container>
);

export default Landing;
