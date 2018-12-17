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

export class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: [{ players: props.players.map(player => ({ ...player, score: 0 })), takerId: '' }],
            showAddScoreModal: false
        };
    }

    addScore = scoreInfo => {
        const { game } = this.state;
        const { players } = game[game.length - 1];
        // TODO: Calculate the new Score according to rules.
        const newPlayers = players.map(player => ({
            ...player,
            score:
                scoreInfo.takerId === player._id
                    ? player.score + scoreInfo.score
                    : scoreInfo.deadIds.includes(player._id)
                        ? player.score
                        : player.score - parseFloat((scoreInfo.score / 3).toFixed(2), 10)
        }));
        const newGame = { players: newPlayers, takerId: scoreInfo.takerId };
        this.setState(state => ({
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
        const { game, showAddScoreModal } = this.state;
        const { players } = this.props;
        return (
            <Fragment>
                <BackButton linkTo={routes.HOME} />
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <Paper style={{ width: '30%', margin: '0 2.5%' }}>
                        <ScoreBoard players={game[0].players} />
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
    isPage
    // connectToRedux({ players: 'players.currentPlayers' })
)(Game);
