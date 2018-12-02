import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

export const SelectInput = ({ label, renderLabel, keyValue, data, ...props }) => (
    <FormControl style={{ minWidth: '150px' }}>
        <InputLabel htmlFor="label">{label}</InputLabel>
        <Select {...props}>
            {data.map(elem => (
                <MenuItem key={elem[keyValue]} value={elem[keyValue]}>
                    {renderLabel(elem)}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

SelectInput.defaultProps = {
    data: []
};
//
SelectInput.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string.isRequired,
    renderLabel: PropTypes.func.isRequired,
    keyValue: PropTypes.string.isRequired
};
