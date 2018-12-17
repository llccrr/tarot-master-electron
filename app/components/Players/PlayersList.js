import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { Table } from '../Table';

export class PlayersList extends Component {
    state = {};

    renderTitleCells = () => [
        <TableCell key="firstname">Prénom ou Surnom</TableCell>,
        <TableCell key="lastname" style={{ textAlign: 'left' }}>
            Nom
        </TableCell>
    ];

    renderNoContent = () => [
        <TableRow key="no-content">
            <TableCell component="th" scope="row">
                Aucun joueur dans la base de donnée
            </TableCell>
        </TableRow>
    ];

    renderPlayerRow = player => (
        <TableRow key={player._id}>
            <TableCell component="th" scope="row">
                {player.firstname}
            </TableCell>
            <TableCell>{player.lastname}</TableCell>
        </TableRow>
    );

    renderRowCells = () => {
        const { players } = this.props;
        return players.length > 0 ? players.map(player => this.renderPlayerRow(player)) : this.renderNoContent();
    };

    render() {
        return (
            <div>
                <Table RowCells={this.renderRowCells()} TitleCells={this.renderTitleCells()} />
            </div>
        );
    }
}

PlayersList.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired
};
