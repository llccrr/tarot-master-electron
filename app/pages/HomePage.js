import React, { Component } from 'react';
import Home from '../components/Home';
import { isPage } from '../hoc/isPage';

class HomeContainer extends Component {
  render() {
    return <Home {...this.props} />;
  }
}

export const HomePage = isPage(HomeContainer);
