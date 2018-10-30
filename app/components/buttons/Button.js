import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@material-ui/core';

export const Button = ({ children, ...props }) => (
  <MuiButton variant="contained" color="primary" {...props}>
    {children}
  </MuiButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired
};
