import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../buttons/Button';
import { Contracts } from './Contracts';

export const bouts = {
    petit: 0,
    21: 1,
    excuse: 2
};
const boutsString = {
    petit: 'Petit',
    21: '21',
    excuse: 'Excuse'
};

export class Bouts extends Component {
    onBoutClick = contractType => () => {
        const { onBoutChange } = this.props;
        onBoutChange(contractType);
    };

    renderButtons = () => {
        const { selectedBouts } = this.props;
        return Object.keys(bouts)
            .sort((a, b) => bouts[a] - bouts[b])
            .map(bout => (
                <Button
                    key={bout}
                    style={styles.button}
                    variant={selectedBouts.includes(bouts[bout]) ? 'contained' : 'outlined'}
                    onClick={this.onBoutClick(bouts[bout])}
                >
                    {boutsString[bout]}
                </Button>
            ));
    };

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0px 0px' }}>
                <p style={{ fontSize: '0.8em' }}>Bouts du preneur</p>
                <div style={{ flexDirection: 'row' }}>{this.renderButtons()}</div>
            </div>
        );
    }
}

Contracts.propTypes = {
    onContractChange: PropTypes.func.isRequired,
    selectedBouts: PropTypes.arrayOf(PropTypes.number).isRequired
};

const styles = {
    button: {
        marginRight: '5px'
    }
};
