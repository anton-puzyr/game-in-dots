import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

import { getPresets, getWinners } from '../../store/actions';
import ActionBar from '../../components/ActionBar';
import Board from '../../components/Board';
import LeaderBoard from '../../components/LeaderBoard';
import './App.scss';

const { func, object, array } = PropTypes;

class App extends Component {
  state = {
    gameMode: {},
    isPlaying: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getPresets());
    dispatch(getWinners());
  }

  setPlay = () => this.setState({ isPlaying: true });

  setGameMode = mode => {
    const { easyMode, normalMode, hardMode } = this.props.presets;

    switch (mode) {
    case 'easy':
      this.setState({ gameMode: easyMode });
      break;
    case 'normal':
      this.setState({ gameMode: normalMode });
      break;
    case 'hard':
      this.setState({ gameMode: hardMode });
      break;
    }
  };

  render() {
    const { winners } = this.props;

    return (
      <div className="app">
        <div className="board-wrapper">
          <ActionBar setGameMode={this.setGameMode} setPlay={this.setPlay} />
          <Board />
        </div>
        <LeaderBoard winners={winners} />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: func,
  presets: object,
  winners: array,
};

const mapStateToProps = state => ({
  presets: state.presets,
  winners: state.winners,
});

export default connect(mapStateToProps)(App);
