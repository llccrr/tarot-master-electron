import {
  INSERT_PLAYER,
  SET_PLAYERS,
  SET_CURRENT_PLAYER
} from '../actions/player.action';

const initialState = { players: [], currentPlayers: [] };

export default function users(state = initialState, action) {
  switch (action.type) {
    case INSERT_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    case SET_PLAYERS:
      return { ...state, players: action.players };
    case SET_CURRENT_PLAYER:
      return { ...state, currentPlayers: action.currentPlayers };
    default:
      return state;
  }
}
