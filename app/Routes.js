/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './pages/App';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { PlayersPage } from './pages/PlayersPage';

const mockedPlayers = [
    { firstname: 'Michel', lastname: 'JeSaisPas', _id: 'D8DYBmWqQIcpN1kx' },
    { firstname: 'Alain', lastname: 'Abry', _id: 'OXUUoxo4cUpaxTJ4' },
    { firstname: "Cham'", lastname: 'B', _id: '49RMcZ7aqxyqbDR7' },
    { firstname: 'Yves', lastname: 'Renaud', _id: '0gYdYsyLlPkuqA0A' }
];

export default () => (
    <App>
        <Switch>
            <Route path={routes.GAME} render={props => <GamePage {...props} />} />
            <Route path={routes.PLAYERS} component={PlayersPage} />
            <Route path={routes.HOME} component={HomePage} />
        </Switch>
    </App>
);
