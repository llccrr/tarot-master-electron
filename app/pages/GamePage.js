import React, { Component } from 'react';
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
import { calculatePoint, falseGivesScore } from '../gameRules/lvhRules';

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
                    {
                        players: initPlayers,
                        takerId: '',
                        deadIds: [],
                        giver: { _id: 'init', firstname: 'Initialisation' }
                    }
                ]
            },
            showAddScoreModal: false
        };
    }

    async componentDidMount() {
      // Redo properly
      const isRetake = window.location.href.split('?')[1] === 'retake=true'
      if(isRetake) {
        const [lastGame] = await myDb.findLastGame();
        const { _id, ...game} = lastGame;
        this.setState({ game: game, id: _id})
      }

    }
    addFalseGives = async (giverId, deadIds) => {
        const { game, id } = this.state;
        const { players } = game.total;

        const calculatePlayerScore = (player, score) => {
            if (giverId === player._id) {
                return score + falseGivesScore;
            }
            return score;
        };

        const newPlayers = players.map(player => {
            const score = calculatePlayerScore(player, 0);
            return {
                ...player,
                score
            };
        });

        const newScore = {
            players: newPlayers,
            takerId: '',
            falseGives: true,
            deadIds,
            giver: players.find(player => player._id === giverId)
        };

        const newTotalScore = game.total.players.map(player => {
            const score = calculatePlayerScore(player, player.score);
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
            await myDb.updateGame(id, newGame);
        } else {
            const createdGame = await myDb.insertGame(newGame);
            this.setState({ id: createdGame._id });
        }
    };

    addNoContract = async scoreInfo => {
        const { game, id } = this.state;
        const { players } = game.total;

        const newPlayers = players.map(player => ({
            ...player,
            score: 0
        }));

        const newScore = {
            players: newPlayers,
            takerId: '',
            deadIds: scoreInfo.deadIds,
            giver: players.find(player => player._id === scoreInfo.giverId)
        };

        const newGame = {
            ...game,
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

    addScore = async scoreInfo => {
        const { game, id } = this.state;
        const { players } = game.total;
        const { takerPoint, selectedContract, selectedBouts, poignee, chelem } = scoreInfo;
        const bonus = {
            petit: scoreInfo.boutAtEndTaker ? 1 : scoreInfo.boutAtEndDefense ? 2 : 0,
            poignee,
            chelem
        };
        const [takerScore, defenseScore] = calculatePoint(takerPoint, selectedContract, selectedBouts.length, bonus);

        const calculatePlayerScore = (player, score) => {
            if (scoreInfo.deadIds.includes(player._id)) {
                return score;
            }
            if (scoreInfo.takerId === player._id) {
                return score + takerScore;
            }
            return score + defenseScore;
        };

        const newPlayers = players.map(player => {
            const score = calculatePlayerScore(player, 0);
            return {
                ...player,
                score
            };
        });

        const newScore = {
            players: newPlayers,
            takerId: scoreInfo.takerId,
            deadIds: scoreInfo.deadIds,
            giver: players.find(player => player._id === scoreInfo.giverId)
        };

        const newTotalScore = game.total.players.map(player => {
            const score = calculatePlayerScore(player, player.score);
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
                    handleNoContract={this.addNoContract}
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
        padding: '5% 2.5%'
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
    isPage,
    connectToRedux({ players: 'players.currentPlayers' })
)(Game);
