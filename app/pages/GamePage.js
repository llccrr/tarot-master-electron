import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connectToRedux } from 'hoc-redux-connector';
import { Paper, Button } from '@material-ui/core';
import routes from '../constants/routes';
import { isPage } from '../hoc/isPage';
import { ScoreBoard } from '../components/game/ScoreBoard';
import { ScoreHistoric } from '../components/game/ScoreHistoric';
import { BackButton } from '../components/buttons/BackButton';
import { NewScorePage } from './NewScorePage';

const mockedPlayers = [
    { firstname: 'Michel', lastname: 'JeSaisPas', _id: 'D8DYBmWqQIcpN1kx', score: 0 },
    { firstname: 'Alain', lastname: 'Abry', _id: 'OXUUoxo4cUpaxTJ4', score: 0 },
    { firstname: "Cham'", lastname: 'B', _id: '49RMcZ7aqxyqbDR7', score: 0 },
    { firstname: 'Yves', lastname: 'Renaud', _id: '0gYdYsyLlPkuqA0A', score: 0 }
];

export class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // players: props.players.map(player => ({ ...player, score: 0 }))
            players: mockedPlayers,
            game: [{ players: mockedPlayers, takerId: '' }],
            showAddScoreModal: false
        };
    }

    addScore = scoreInfo => {
        const { players } = this.state;
        const newPlayers = players.map(player => {
            return {
                ...player,
                score:
                    scoreInfo.takerId === player._id
                        ? player.score + scoreInfo.score
                        : scoreInfo.deadIds.includes(player._id)
                            ? player.score
                            : player.score - parseFloat((scoreInfo.score / 3).toFixed(2), 10)
            };
        });
        const newGame = { players: newPlayers, takerId: scoreInfo.takerId };
        this.setState(state => ({
            players: newPlayers,
            showAddScoreModal: false,
            game: [newGame, ...state.game]
        }));
    };

    showAddScoreModal = () => {
        this.setState({ showAddScoreModal: true });
    };

    closeAddScoreModal = () => {
        this.setState({ showAddScoreModal: false });
    };

    render() {
        const { players, game, showAddScoreModal } = this.state;
        return (
            <Fragment>
                <BackButton linkTo={routes.HOME} />
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <Paper style={{ width: '30%', margin: '0 2.5%' }}>
                        <ScoreBoard players={players} />
                    </Paper>
                    <Paper style={{ width: '60%', margin: '0 2.5%' }}>
                        <ScoreHistoric game={game} />
                    </Paper>
                </div>
                <Button style={{ alignSelf: 'flex-end' }} onClick={this.showAddScoreModal}>
                    Nouvelle partie
                </Button>
                <NewScorePage
                    open={showAddScoreModal}
                    title="Nouveau score"
                    players={players}
                    handleAddScore={this.addScore}
                    handleClose={this.closeAddScoreModal}
                />
            </Fragment>
        );
    }
}

Game.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object.isRequired
};

export const GamePage = compose(
    isPage,
    connectToRedux({ players: 'players.currentPlayers' })
)(Game);
