import React, { Component } from 'react';
import { connectToRedux } from 'hoc-redux-connector';
import { TextInput } from '../TextInputs/TextInput';
import { Button } from '../buttons/Button';
import { insertPlayer as insertPlayerAction } from '../../actions/player.action';

const myDb = require('electron').remote.require('../database/store');

class PureNewPlayerForm extends Component {
  state = {
    loading: false,
    firstname: '',
    lastname: ''
  };

  addNewPlayer = async () => {
    const { firstname, lastname } = this.state;
    const { insertPlayer } = this.props;
    this.setState({ loading: true });
    const newPlayer = await myDb.insertPlayer({ firstname, lastname });
    insertPlayer(newPlayer);
    this.setState({ loading: false, firstname: '', lastname: '' });
  };

  setPlayer = field => e => {
    this.setState({ [field]: e.target.value });
  };

  render() {
    const { loading } = this.state;
    return (
      <section style={styles.section}>
        <h1>Nouveau Joueur</h1>
        <TextInput
          onChange={this.setPlayer('firstname')}
          style={styles.textInputs}
          placeholder="Prénom ou Surnom"
        />
        <TextInput
          onChange={this.setPlayer('lastname')}
          style={styles.textInputs}
          placeholder="Nom"
        />
        <Button
          onClick={this.addNewPlayer}
          style={styles.textInputs}
          disabled={loading}
        >
          {loading ? 'loading' : 'Créer'}
        </Button>
      </section>
    );
  }
}

export const NewPlayerForm = connectToRedux(null, {
  insertPlayer: insertPlayerAction
})(PureNewPlayerForm);

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputs: {
    width: '100%',
    maxWidth: '300px'
  }
};
