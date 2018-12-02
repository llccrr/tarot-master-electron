import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

export class TextInput extends Component {
    render() {
        return <TextField {...this.props} />;
    }
}
