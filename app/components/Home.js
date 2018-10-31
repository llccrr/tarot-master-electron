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

class PureHome extends Component {
  state = { dialogOpen: false, currentPlayers: [] };

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

  render() {
    const { dialogOpen } = this.state;
    const { players } = this.props;

    return (
      <section style={styles.section}>
        <h2>REACT PLAYGROUND</h2>
        <div style={styles.mainRow}>
          <div style={{ display: 'flex', flex: 1 }}>
            <div style={styles.lastGame}>Historique de la dernière partie</div>
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
            renderRowContent={item => (
              <ListItemText primary={`${item.firstname} ${item.lastname}`} />
            )}
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
  connectToRedux(
    { players: 'players.players' },
    { setCurrentPlayers: setCurrentPlayersAction }
  )
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
    display: 'flex',
    width: '400px',
    height: '300px',
    border: 'solid 1px red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    border: 'solid 1px blue'
  },
  link: { textAlign: 'center' },
  buttons: { width: '80%', height: '100px', margin: '10px 0' }
};
