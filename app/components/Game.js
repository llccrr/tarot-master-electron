import React, { Component } from 'react';
import routes from '../constants/routes';
import { BackButton } from './buttons/BackButton';

export class Game extends Component {
  render() {
    return <div>{<BackButton linkTo={routes.HOME} />}</div>;
  }
}
