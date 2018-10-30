// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import players from './players.reducer';
import ui from './ui.reducer';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});
  return connectRouter(history)(
    combineReducers({ router: routerReducer, players, ui })
  );
}
