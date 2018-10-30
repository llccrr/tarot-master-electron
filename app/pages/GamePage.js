// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Game } from '../components/Game';
import { isPage } from '../hoc/isPage';

export const GamePage = isPage(Game);
// import * as CounterActions from '../actions/counter';

// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch);
// }

// export const connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Game);
