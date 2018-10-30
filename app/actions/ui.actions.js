export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const showSnackbar = message => ({
  type: 'SHOW_SNACKBAR',
  message
});

export const hideSnackbar = () => ({
  type: 'HIDE_SNACKBAR',
  message: ''
});
