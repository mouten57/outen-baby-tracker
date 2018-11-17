import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class MenuExamplePointing extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing style={{ marginBottom: '10px' }}>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/diapers"
            name="diapers"
            active={activeItem === 'diapers'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to="/feedings"
            name="feedings"
            active={activeItem === 'feedings'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}
