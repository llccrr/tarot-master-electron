/* eslint-disable react/forbid-prop-types,react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Divider, Slide, Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { isPage } from '../hoc/isPage';
import { SelectInput } from '../components/forms/SelectInput';
import { withSnackbar } from '../containers/withSnackbar';
import { Button } from '../components/buttons/Button';
import { Bouts } from '../components/forms/Bouts';
import { TextInput } from '../components/TextInputs/TextInput';
import { Contracts, contracts } from '../components/forms/Contracts';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export class Score extends Component {
    state = {
        giverId: '',
        takerId: '',
        selectedContract: contracts.petite,
        deadIds: [],
        poignee: 0,
        falseGives: false,
        noContract: false,
        boutAtEndDefense: false,
        boutAtEndTaker: false,
        takerPoint: 50,
        defensePoint: 51,
        chelem: 0,
        selectedBouts: [],
        score: 50
    };

    initState = () => {
        this.setState({
            giverId: '',
            takerId: '',
            poignee: 0,
            selectedContract: contracts.petite,
            deadIds: [],
            falseGives: false,
            noContract: false,
            takerPoint: 50,
            defensePoint: 51,
            selectedBouts: [],
            score: 50
        });
    };

    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    };

    handleSelect = key => event => {
        this.setState({ [key]: event.target.value });
    };

    handleMultipleSelect = (key, max) => event => {
        const { showSnackbar } = this.props;
        const { value } = event.target;
        if (value.length > max) {
            showSnackbar(`Merci de selectionner ${max} morts`);
            return;
        }
        this.setState({ [key]: value });
    };

    handleNoNext = key => () => {
        this.setState(state => ({ [key]: !state[key] }));
    };

    onTakerPointChange = event => {
        const value = parseInt(event.target.value, 10);
        this.setState({ takerPoint: value, defensePoint: 91 - value });
    };

    onDefensePointChange = event => {
        const value = parseInt(event.target.value, 10);
        this.setState({ defensePoint: value, takerPoint: 91 - value });
    };

    addScore = () => {
        const { handleAddScore, handleFalseGives, handleNoContract, players, showSnackbar } = this.props;
        const {
            giverId,
            takerId,
            selectedContract,
            deadIds,
            falseGives,
            noContract,
            takerPoint,
            defensePoint,
            selectedBouts,
            score
        } = this.state;

        if (!giverId) {
            showSnackbar(`"Donneur" obligatoire`);
            return;
        }
        if (noContract) {
            handleNoContract(this.state);
            return;
        }
        if (deadIds.length + 4 !== players.length) {
            showSnackbar(`Vérifie ton nombre de mort`);
            return;
        }
        if (falseGives) {
            handleFalseGives(giverId, deadIds);
            return;
        }

        if (!takerId || (!selectedContract && selectedContract !== 0)) {
            showSnackbar(`Vérifie les données du preneur (preneur, contract, bouts...)`);
            return;
        }
        if (!defensePoint || !takerPoint) {
            showSnackbar(`Vérifie les scores des deux camps`);
            return;
        }
        handleAddScore(this.state);
        this.initState();
    };

    onBoutChange = bout => {
        const { selectedBouts } = this.state;
        const boutIndex = selectedBouts.findIndex(it => it === bout);
        if (~boutIndex) {
            selectedBouts.splice(boutIndex, 1);
        } else {
            selectedBouts.push(bout);
        }
        this.setState({ selectedBouts });
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
        const { players, classes, open, title } = this.props;
        const {
            giverId,
            chelem,
            falseGives,
            noContract,
            deadIds,
            selectedContract,
            selectedBouts,
            takerId,
            poignee,
            boutAtEndDefense,
            boutAtEndTaker
        } = this.state;

        const skip = noContract || falseGives;
        return (
            <div>
                <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {title}
                            </Typography>
                            <Button color="secondary" onClick={this.addScore}>
                                Sauvegarder
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 25px' }}>
                        <div>
                            <SelectInput
                                className={classes.horizontalField}
                                keyValue="_id"
                                label="Donneur"
                                renderLabel={item => item.firstname}
                                value={giverId}
                                onChange={this.handleSelect('giverId')}
                                data={players}
                            />
                            {players.length > 3 && (
                                <SelectInput
                                    className={classes.horizontalField}
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
                        <Divider style={{ margin: '20px 0px' }} variant="middle" />
                        {!skip && (
                            <div>
                                <Contracts
                                    selectedContract={selectedContract}
                                    onContractChange={selected => this.setState({ selectedContract: selected })}
                                />
                                <div style={{ margin: '40px 0px 20px 0px' }}>
                                    {this.renderScoreField('Preneur', 'takerPoint')}
                                    {this.renderScoreField('Défense', 'defensePoint')}
                                    <SelectInput
                                        className={classes.horizontalField}
                                        keyValue="_id"
                                        label="Preneur"
                                        renderLabel={item => item.firstname}
                                        value={takerId}
                                        onChange={this.handleSelect('takerId')}
                                        data={players}
                                    />
                                </div>
                                <Bouts selectedBouts={selectedBouts} onBoutChange={this.onBoutChange} />
                                <Divider style={{ margin: '20px 0px' }} variant="middle" />
                                <div style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '0.8em' }}>Bouts à la fin</p>
                                    {this.renderNoNextBtn('boutAtEndDefense', 'Défense', boutAtEndTaker)}
                                    {this.renderNoNextBtn('boutAtEndTaker', 'Preneur', boutAtEndDefense)}
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <SelectInput
                                        className={classes.horizontalField}
                                        keyValue="id"
                                        label="Poignée"
                                        renderLabel={item => item.label}
                                        value={poignee}
                                        onChange={this.handleSelect('poignee')}
                                        data={[
                                            { id: 0, label: 'Aucune' },
                                            { id: 1, label: 'Simple' },
                                            { id: 2, label: 'Double' },
                                            { id: 3, label: 'Triple' }
                                        ]}
                                    />
                                    <SelectInput
                                        className={classes.horizontalField}
                                        keyValue="id"
                                        label="Chelem"
                                        renderLabel={item => item.label}
                                        value={chelem}
                                        onChange={this.handleSelect('chelem')}
                                        data={[
                                            { id: 0, label: 'Aucun' },
                                            { id: 1, label: 'Annoncé et réalisé' },
                                            { id: 2, label: 'Réalisé' },
                                            { id: 3, label: 'Annoncé et non réalisé' }
                                        ]}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog>
            </div>
        );
    }
}

Score.propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired
};

const styles = {
    horizontalField: {
        marginRight: '20px'
    },
    appBar: {
        position: 'relative'
    },
    flex: {
        flex: 1
    }
};

export const NewScorePage = compose(
    withStyles(styles),
    isPage,
    withSnackbar
)(Score);
