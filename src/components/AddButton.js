import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AddButton = props => (
  <Link to={props.link}>
    <Button circular color="red" icon="add" style={{ float: 'right' }} />
  </Link>
);

export default AddButton;
