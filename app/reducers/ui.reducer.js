import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../actions/ui.actions';

const initialState = { snackbarVisible: false, snackbarMessage: '' };

export default function ui(state = initialState, action) {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbarVisible: true,
        snackbarMessage: action.message
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        snackbarVisible: false,
        snackbarMessage: action.message
      };
    default:
      return state;
  }
}
