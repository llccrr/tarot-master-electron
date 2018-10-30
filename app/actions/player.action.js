export const INSERT_PLAYER = 'INSERT_PLAYER';
export const SET_PLAYERS = 'SET_PLAYERS';

export const insertPlayer = user => ({
  type: 'INSERT_PLAYER',
  user
});

export const setPlayers = users => ({
  type: 'SET_PLAYERS',
  users
});
