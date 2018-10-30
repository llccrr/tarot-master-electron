import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import { Button } from './buttons/Button';

export default class Home extends Component {
  render() {
    return (
      <section style={styles.section}>
        <h2>TAROT MASTER</h2>
        <div style={styles.mainRow}>
          <div style={{ display: 'flex', flex: 1 }}>
            <div style={styles.lastGame}>Historique de la dernière partie</div>
          </div>

          <div style={styles.buttonsContainer}>
            <Link style={styles.link} to={routes.PLAYERS}>
              <Button style={styles.buttons}>Ajouter un joueur</Button>
            </Link>
            <Link style={styles.link} to={routes.GAME}>
              <Button style={styles.buttons}>Nouvelle Partie</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    alignSelf: 'stretch',
    paddingTop: '20px'
  },
  lastGame: {
    display: 'flex',
    width: '400px',
    height: '300px',
    border: 'solid 1px red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    border: 'solid 1px blue'
  },
  link: { textAlign: 'center' },
  buttons: { width: '80%', height: '100px', margin: '10px 0' }
};
