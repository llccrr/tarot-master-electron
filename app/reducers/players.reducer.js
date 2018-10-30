import { INSERT_PLAYER, SET_PLAYERS } from '../actions/player.action';

const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {
    case INSERT_PLAYER:
      return [...state, action.user];
    case SET_PLAYERS:
      return action.users;
    default:
      return state;
  }
}
