import React from 'react';

import { Container, Image } from 'semantic-ui-react';

const Landing = () => (
  <Container>
    <Container text>
      <h2> Baby Tracker!</h2>
      <p>Keeping track of baby Avery</p>
    </Container>
    <Image
      style={{ marginTop: '10px' }}
      src="https://i.imgur.com/hWeiC6X.jpg"
      size="large"
      bordered
      centered
      circular
    />
  </Container>
);

export default Landing;
