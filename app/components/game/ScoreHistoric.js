import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { Table } from '../Table';

export class ScoreHistoric extends Component {
    renderTitleCells = () => {
        const { game } = this.props;
        return game[0].players.map(player => <TableCell key={player.firstname}>{player.firstname}</TableCell>);
    };

    renderRowCells = () => {
        const { game } = this.props;

        if (!(game && game.length > 0)) return [];
        return game.map((scoreInfo, index) => (
            <TableRow key={index}>
                {scoreInfo.players.map(player => (
                    <TableCell
                        style={{ color: player._id === scoreInfo.takerId ? 'orange' : '' }}
                        key={player._id}
                        scope="row"
                    >
                        {player.score}
                    </TableCell>
                ))}
            </TableRow>
        ));
    };

    render() {
        const { style } = this.props;
        return <Table style={style} RowCells={this.renderRowCells()} TitleCells={this.renderTitleCells()} />;
    }
}

ScoreHistoric.defaultProps = {
    style: {}
};

ScoreHistoric.propTypes = {
    game: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: PropTypes.object
};
