/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './pages/App';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { PlayersPage } from './pages/PlayersPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.GAME} component={GamePage} />
      <Route path={routes.PLAYERS} component={PlayersPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
