/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { connectToRedux } from 'hoc-redux-connector';
import { ListItemText } from '@material-ui/core';
import routes from '../constants/routes';
import { Button } from './buttons/Button';
import { Dialog } from './global/Modal';
import { SelectableList } from './SelectableList';
import { setCurrentPlayers as setCurrentPlayersAction } from '../actions/player.action';
import { withSnackbar, snackbarPropTypes } from '../containers/withSnackbar';
import { ScoreBoard } from './game/ScoreBoard';

const myDb = require('electron').remote.require('../database/store');

class PureHome extends Component {
    state = { dialogOpen: false, currentPlayers: [], lastGame: undefined };

    async componentDidMount() {
        // const test = await myDb.findAll('games');
        // myDb.flushGamesDb();
        const [lastGame] = await myDb.findLastGame();
        this.setState({ lastGame });
    }

    handleCloseDialog = () => {
        this.setState({ dialogOpen: false });
    };

    handleShowDialog = () => {
        this.setState({ dialogOpen: true });
    };

    startGame = () => {
        // redirect to route
        const { setCurrentPlayers, history, showSnackbar } = this.props;
        const { currentPlayers } = this.state;
        if (currentPlayers.length >= 4 && currentPlayers.length <= 7) {
            setCurrentPlayers(currentPlayers);
            history.push('/game');
        } else {
            showSnackbar('Merci de selectionner entre 4 et 7 joueurs');
        }
    };

    retakeGame = () => {
      const { history } = this.props;

      history.push('/game?retake=true');
    }
    render() {
        const { dialogOpen, lastGame } = this.state;
        const { players } = this.props;

        return (
            <section style={styles.section}>
                <h2 style={{ color: '#303f9f' }}>Tarot Master</h2>
                <div style={styles.mainRow}>
                    <div style={{ display: 'flex', flex: 1, padding: '50px 0px' }}>
                        {lastGame && (
                            <div style={styles.lastGame}>
                                <h5>Dernière partie {new Date(lastGame.creationDate).toLocaleString()}</h5>
                                <ScoreBoard players={lastGame.total.players} />
                                <Button style={{ marginTop: '5px' }} onClick={this.retakeGame}>
                                    Reprendre la partie
                                </Button>
                            </div>
                        )}
                    </div>

                    <div style={styles.buttonsContainer}>
                        <Link style={styles.link} to={routes.PLAYERS}>
                            <Button style={styles.buttons}>Ajouter un joueur</Button>
                        </Link>
                        <div style={styles.link}>
                            <Button onClick={this.handleShowDialog} style={styles.buttons}>
                                Nouvelle Partie
                            </Button>
                        </div>
                    </div>
                </div>
                <Dialog
                    scroll="paper"
                    open={dialogOpen}
                    title="Selectionnez les joueurs"
                    onClose={this.handleCloseDialog}
                >
                    <SelectableList
                        items={players}
                        onChange={currentPlayers => {
                            this.setState({ currentPlayers });
                        }}
                        renderRowContent={item => <ListItemText primary={`${item.firstname} ${item.lastname}`} />}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '12px 2px'
                        }}
                    >
                        <Button onClick={this.startGame} color="primary" autoFocus>
                            Commencer
                        </Button>
                    </div>
                </Dialog>
            </section>
        );
    }
}

PureHome.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentPlayers: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    ...snackbarPropTypes
};
const Home = compose(
    withSnackbar,
    connectToRedux({ players: 'players.players' }, { setCurrentPlayers: setCurrentPlayersAction })
)(PureHome);
export default Home;

const styles = {
    section: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'space-around',
        alignSelf: 'stretch',
        paddingTop: '20px'
    },
    lastGame: {
        flexDirection: 'column',
        display: 'flex',
        width: '400px',
        height: '300px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
        // border: 'solid 1px blue'
    },
    link: { textAlign: 'center' },
    buttons: { width: '80%', height: '100px', margin: '10px 0' }
};
