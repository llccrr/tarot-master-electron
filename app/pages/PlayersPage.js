import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connectToRedux } from 'hoc-redux-connector';
import { isPage } from '../hoc/isPage';
import { NewPlayerForm } from '../components/Players/NewPlayerForm';
import { BackButton } from '../components/buttons/BackButton';
import routes from '../constants/routes';
import { PlayersList } from '../components/Players/PlayersList';

const PlayersContainer = ({ players }) => {
  console.log('PLAYERS', players);
  return (
    <section>
      <BackButton linkTo={routes.HOME} />
      <NewPlayerForm />
      <PlayersList players={players} />
    </section>
  );
};

PlayersContainer.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const PlayersPage = compose(
  isPage,
  connectToRedux({ players: 'players.players' })
)(PlayersContainer);
