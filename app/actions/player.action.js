export const INSERT_PLAYER = 'INSERT_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

export const insertPlayer = player => ({
  type: INSERT_PLAYER,
  player
});

export const setPlayers = players => ({
  type: SET_PLAYERS,
  players
});

export const setCurrentPlayers = currentPlayers => ({
  type: SET_CURRENT_PLAYER,
  currentPlayers
});
