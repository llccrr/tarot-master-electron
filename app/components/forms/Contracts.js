import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../buttons/Button';

export const contracts = {
    petite: 0,
    pousse: 1,
    garde: 2,
    gardeSans: 3,
    gardeContre: 4
};

const contractsString = {
    petite: 'Petite',
    pousse: 'Pousse',
    garde: 'Garde',
    gardeSans: 'Garde sans le Chien',
    gardeContre: 'Garde contre le Chien'
};

export class Contracts extends Component {
    onContractClick = contractType => () => {
        const { onContractChange } = this.props;
        onContractChange(contractType);
    };

    renderButtons = () => {
        const { selectedContract } = this.props;
        return Object.keys(contracts).map(contract => (
            <Button
                key={contract}
                style={styles.button}
                variant={contracts[contract] === selectedContract ? 'contained' : 'outlined'}
                onClick={this.onContractClick(contracts[contract])}
            >
                {contractsString[contract]}
            </Button>
        ));
    };

    render() {
        return <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0' }}>{this.renderButtons()}</div>;
    }
}

Contracts.propTypes = {
    onContractChange: PropTypes.func.isRequired,
    selectedContract: PropTypes.number.isRequired
};

const styles = {
    button: {
        margin: '0 5px'
    }
};
