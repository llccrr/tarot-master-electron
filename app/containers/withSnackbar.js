import PropTypes from 'prop-types';
import { connectToRedux } from 'hoc-redux-connector';
import {
  hideSnackbar as hideSnackbarAction,
  showSnackbar as showSnackbarAction
} from '../actions/ui.actions';

export const withSnackbar = connectToRedux(
  {
    snackbarMessage: 'ui.snackbarMessage',
    snackbarVisible: 'ui.snackbarVisible'
  },
  {
    showSnackbar: showSnackbarAction,
    hideSnackbar: hideSnackbarAction
  }
);

export const snackbarPropTypes = {
  showSnackbar: PropTypes.func.isRequired,
  hideSnackbar: PropTypes.func.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  snackbarVisible: PropTypes.bool.isRequired
};
