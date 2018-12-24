import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import { Table } from '../Table';

export class ScoreHistoric extends Component {
    renderTitleCells = () => {
        const { scores } = this.props;
        return [
            scores[0].players.map(player => <TableCell key={player.firstname}>{player.firstname}</TableCell>),
            <TableCell key="giver">Donneur</TableCell>
        ];
    };

    renderRowCells = () => {
        const { scores } = this.props;
        if (!(scores && scores.length > 0)) return [];
        return scores.map((scoreInfo, index) => (
            <TableRow key={index}>
                {console.log(scoreInfo)}
                {scoreInfo.players.map(player => (
                    <TableCell
                        style={{
                            color:
                                player._id === scoreInfo.takerId
                                    ? 'orange'
                                    : scoreInfo.falseGives && player._id === scoreInfo.giver._id
                                        ? 'red'
                                        : ''
                        }}
                        key={player._id}
                        scope="row"
                    >
                        {scoreInfo.deadIds.includes(player._id) ? '-' : player.score}
                    </TableCell>
                ))}
                <TableCell key={(scoreInfo.giver && scoreInfo.giver._id) || 'NoGiver'} scope="row">
                    {scoreInfo.giver && scoreInfo.giver.firstname}
                </TableCell>
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
    scores: PropTypes.arrayOf(PropTypes.object).isRequired,
    style: PropTypes.object
};
