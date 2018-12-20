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

const myDb = require('electron').remote.require('../database/store');

export class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            game: {
                scores: [{ players: props.players.map(player => ({ ...player, score: 0 })), takerId: '' }]
            },
            showAddScoreModal: false
        };
    }

    addScore = async scoreInfo => {
        const { game, id } = this.state;
        const { players } = game.scores[0];
        // TODO: Calculate the new Score according to rules.
        const newPlayers = players.map(player => {
            console.log(player.score, '+', scoreInfo.score);
            const score =
                scoreInfo.takerId === player._id
                    ? player.score + scoreInfo.score
                    : scoreInfo.deadIds.includes(player._id)
                        ? player.score
                        : parseFloat(player.score - scoreInfo.score / 3).toFixed(2);
            return {
                ...player,
                score
            };
        });
        const newScore = { players: newPlayers, takerId: scoreInfo.takerId };
        const newGame = { ...game, scores: [newScore, ...game.scores] };
        this.setState({
            showAddScoreModal: false,
            game: newGame
        });
        if (id) {
            console.log('updating');
            await myDb.updateGame(id, newGame);
        } else {
            const createdGame = await myDb.insertGame(newGame);
            this.setState({ id: createdGame._id });
        }
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
                    <Paper style={{ width: '30%', height: '350px', margin: '0 2.5%' }}>
                        <ScoreBoard players={game.scores[0].players} />
                    </Paper>
                    <Paper style={{ width: '60%', margin: '0 2.5%', height: '350px', overflow: 'scroll' }}>
                        <ScoreHistoric scores={game.scores} />
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
