import React from 'react';
import PropTypes from 'prop-types';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableBody
} from '@material-ui/core';

export const Table = ({ TitleCells, RowCells }) => (
  <MuiTable>
    <TableHead>
      <TableRow>{TitleCells}</TableRow>
    </TableHead>
    <TableBody>{RowCells}</TableBody>
  </MuiTable>
);

Table.propTypes = {
  TitleCells: PropTypes.arrayOf(PropTypes.node).isRequired,
  RowCells: PropTypes.arrayOf(PropTypes.node).isRequired
};
