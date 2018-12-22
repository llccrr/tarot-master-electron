import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { Table } from '../Table';

export class ScoreBoard extends Component {
    renderRowCells = () => {
        const { players } = this.props;

        if (!(players && players.length > 0)) return [];
        return [...players].sort((a, b) => b.score - a.score).map(player => (
            <TableRow key={player._id}>
                <TableCell scope="row">{player.firstname}</TableCell>
                <TableCell numeric>{player.score}</TableCell>
            </TableRow>
        ));
    };

    renderTitleCells = () => [
        <TableCell key="name">Nom</TableCell>,
        <TableCell key="score" numeric>
            Score
        </TableCell>
    ];

    render() {
        const { style } = this.props;
        return <Table style={style} RowCells={this.renderRowCells()} TitleCells={this.renderTitleCells()} />;
    }
}

ScoreBoard.defaultProps = {
    style: {}
};

ScoreBoard.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: PropTypes.object
};
