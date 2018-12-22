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
import { calculatePoint } from '../gameRules/lvhRules';

const myDb = require('electron').remote.require('../database/store');

export class Game extends Component {
    constructor(props) {
        super(props);
        const initPlayers = props.players.map(player => ({ ...player, score: 0 }));
        this.state = {
            game: {
                creationDate: Date.now(),
                total: {
                    players: initPlayers
                },
                scoresHistoric: [
                    { players: initPlayers, takerId: '', giver: { _id: 'init', firstname: 'Initialisation' } }
                ]
            },
            showAddScoreModal: false
        };
    }

    addFalseGives = async giverId => {
        // const { game, id } = this.state;
        // const { players } = game.total;
        // const newPlayers = players.map(player => {
        //     const score = giverId === player._id ? player.score - 10 : player.score;
        //     return {
        //         ...player,
        //         score
        //     };
        // });
        // const newScore = { players: newPlayers, takerId: '', giverId, falseGives: true };
        // const newGame = { ...game, scores: [newScore, ...game.scores] };
        // this.setState({
        //     showAddScoreModal: false,
        //     game: newGame
        // });
        // if (id) {
        //     await myDb.updateGame(id, newGame);
        // } else {
        //     const createdGame = await myDb.insertGame(newGame);
        //     this.setState({ id: createdGame._id });
        // }
    };

    addScore = async scoreInfo => {
        const { game, id } = this.state;
        const { players } = game.total;
        const { takerPoint, selectedContract, selectedBouts } = scoreInfo;

        const takerScore = calculatePoint(takerPoint, selectedContract, selectedBouts.length);
        const defenseScore = -parseInt(takerScore / 3, 10);
        const newPlayers = players.map(player => {
            const score = scoreInfo.takerId === player._id ? takerScore : defenseScore;
            return {
                ...player,
                score
            };
        });

        // return;
        const newScore = {
            players: newPlayers,
            takerId: scoreInfo.takerId,
            giver: players.find(player => player._id === scoreInfo.giverId)
        };
        console.log(newScore.giverId);
        const newTotalScore = game.total.players.map(player => {
            const score = player.score + (scoreInfo.takerId === player._id ? takerScore : defenseScore);
            return {
                ...player,
                score
            };
        });
        const newGame = {
            ...game,
            total: { players: newTotalScore },
            scoresHistoric: [newScore, ...game.scoresHistoric]
        };
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
            <div style={styles.mainContainer}>
                <BackButton linkTo={routes.HOME} />
                <Button color="secondary" style={styles.addScoreButton} onClick={this.showAddScoreModal}>
                    Ajouter un score
                </Button>

                <div style={styles.tableContainer}>
                    <Paper style={styles.scoreBoardPaper}>
                        <ScoreBoard players={game.total.players} />
                    </Paper>

                    <Paper style={styles.historicPaper}>
                        <ScoreHistoric scores={game.scoresHistoric} />
                    </Paper>
                </div>

                <NewScorePage
                    open={showAddScoreModal}
                    title="Ajouter un score"
                    players={players}
                    handleAddScore={this.addScore}
                    handleFalseGives={this.addFalseGives}
                    handleClose={this.closeAddScoreModal}
                />
            </div>
        );
    }
}

const styles = {
    tableContainer: { display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 2.5%'
    },
    addScoreButton: { width: '180px', alignSelf: 'flex-end' },
    scoreBoardPaper: { width: '30%', height: '350px' },
    historicPaper: {
        height: '350px',
        overflow: 'scroll',
        width: '66%'
    }
};

Game.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object.isRequired
};

export const GamePage = compose(
    isPage
    // connectToRedux({ players: 'players.currentPlayers' })
)(Game);
