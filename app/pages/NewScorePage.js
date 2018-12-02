/* eslint-disable react/forbid-prop-types,react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Paper, Divider } from '@material-ui/core';
import { isPage } from '../hoc/isPage';
import { SelectInput } from '../components/forms/SelectInput';
import { withSnackbar } from '../containers/withSnackbar';
import { Button } from '../components/buttons/Button';
import { Bouts } from '../components/forms/Bouts';
import { TextInput } from '../components/TextInputs/TextInput';

export class Score extends Component {
    state = {
        giverId: '',
        deadIds: [],
        falseGives: false,
        noContract: false,
        takerPoint: 50,
        defensePoint: 51
    };

    handleSelect = key => event => {
        this.setState({ [key]: event.target.value });
    };

    handleMultipleSelect = (key, max) => event => {
        console.log('max', max);
        const { showSnackbar } = this.props;
        const { value } = event.target;
        if (value.length > max) {
            showSnackbar(`Merci de selectionner ${max} morts`);
            return;
        }
        this.setState({ [key]: value });
    };

    handleCheck = key => event => {
        this.setState({ [key]: event.target.checked });
    };

    handleNoNext = key => () => {
        this.setState(state => ({ [key]: !state[key] }));
    };

    onTakerPointChange = event => {
        const value = event.target.value || 0;
        // if (value > 91) return;
        this.setState({ takerPoint: value, defensePoint: 91 - value });
    };

    onDefensePointChange = event => {
        const value = event.target.value || 0;
        // if (value > 91) return;
        this.setState({ defensePoint: value, takerPoint: 91 - value });
    };

    renderNoNextBtn = (keyState, label, disabled) => (
        <Button
            disabled={disabled}
            variant={this.state[keyState] ? 'contained' : 'outlined'}
            style={styles.horizontalField}
            onClick={this.handleNoNext(keyState)}
        >
            {label}
        </Button>
    );

    renderScoreField = (label, stateKey) => (
        <TextInput
            style={styles.horizontalField}
            variant="outlined"
            type="number"
            label={label}
            value={this.state[stateKey]}
            onChange={stateKey === 'takerPoint' ? this.onTakerPointChange : this.onDefensePointChange}
        />
    );

    render() {
        const { players } = this.props;
        const { giverId, falseGives, noContract, deadIds } = this.state;

        const skip = noContract || falseGives;
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div>
                    <SelectInput
                        style={styles.horizontalField}
                        keyValue="_id"
                        label="Donneur"
                        renderLabel={item => item.firstname}
                        value={giverId}
                        onChange={this.handleSelect('giverId')}
                        data={players}
                    />
                    {players.length > 3 && (
                        <SelectInput
                            style={styles.horizontalField}
                            multiple
                            keyValue="_id"
                            label="Morts"
                            renderLabel={item => item.firstname}
                            value={deadIds}
                            onChange={this.handleMultipleSelect('deadIds', players.length - 4)}
                            data={players}
                        />
                    )}
                </div>
                <div style={{ marginTop: '20px' }}>
                    {this.renderNoNextBtn('falseGives', 'Fausse donne', noContract)}
                    {this.renderNoNextBtn('noContract', 'Aucun contrat', falseGives)}
                </div>
                <Divider style={{ margin: '20px 0' }} variant="middle" />
                {!skip && (
                    <div>
                        {this.renderScoreField('Preneur', 'takerPoint')}
                        {this.renderScoreField('Défense', 'defensePoint')}
                        <Bouts />
                    </div>
                )}
            </div>
        );
    }
}

Score.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const NewScorePage = compose(
    isPage,
    withSnackbar
)(Score);

const styles = {
    horizontalField: {
        marginRight: '20px'
    }
};
