import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';

export const Snackbar = props => (
  <MuiSnackbar
    {...props}
    autoHideDuration={6000}
    ContentProps={{
      variant: `body1`
    }}
  />
);
