import React, { Component } from 'react';
import { Switch } from '@material-ui/core';
import { Button } from '../buttons/Button';

export class Bouts extends Component {
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0' }}>
                <Button>Petit</Button>
                <Button>21</Button>
                <Button>Excuse</Button>
                <Switch />
            </div>
        );
    }
}
