// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {}
};

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
