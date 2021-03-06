import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connectToRedux } from 'hoc-redux-connector';
import { Snackbar } from '../components/global/Snackbar';
import { withSnackbar, snackbarPropTypes } from '../containers/withSnackbar';
import { setPlayers as setPlayersAction } from '../actions/player.action';

const myDb = require('electron').remote.require('../database/store');

class PureApp extends Component {
    async componentDidMount() {
        const { setPlayers } = this.props;
        const players = await myDb.findAllPlayers();
        if (players.length > 0) {
            setPlayers(players);
        }
    }

    handleClose = () => {
        const { hideSnackbar } = this.props;
        hideSnackbar();
    };

    render() {
        const { children, snackbarVisible, snackbarMessage } = this.props;
        return (
            <div style={{ display: 'flex', flex: 1 }}>
                {children}
                <Snackbar open={snackbarVisible} message={<span>{snackbarMessage}</span>} onClose={this.handleClose} />
            </div>
        );
    }
}

PureApp.propTypes = {
    children: PropTypes.node.isRequired,
    ...snackbarPropTypes
};

const App = compose(
    connectToRedux(null, {
        setPlayers: setPlayersAction
    }),
    withSnackbar
)(PureApp);

export default App;
