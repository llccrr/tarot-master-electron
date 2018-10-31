import React from 'react';
import PropTypes from 'prop-types';
import { Dialog as MuiDialog, DialogTitle } from '@material-ui/core';

export class Dialog extends React.Component {
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { title, children, ...props } = this.props;
    return (
      <MuiDialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...props}
      >
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <div>{children}</div>
      </MuiDialog>
    );
  }
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
