import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

import { getPresets, getWinners } from '../../store/actions';
import ActionBar from '../../components/ActionBar';
import Board from '../../components/Board';
import LeaderBoard from '../../components/LeaderBoard';
import Square from '../../components/Square';
import './App.scss';

const { func, object, array } = PropTypes;

class App extends Component {
  state = {
    preset: {},
    field: 5,
    isPlaying: false,
    rows: [],
    coordinates: [],
    isClicked: false,
    clicks: 0,
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
      this.setState({ preset: easyMode });
      break;
    case 'normal':
      this.setState({ preset: normalMode });
      break;
    case 'hard':
      this.setState({ preset: hardMode });
      break;
    }
  };

  getIndex = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  replaceArrayElement = (arr, index, amount, element) => arr.splice(index, amount, element);

  generateGrid = () => {
    const { field, coordinates, isClicked } = this.state;
    let rows = [];

    for (let i = 0; i < field; i++) {
      let children = [];

      for (let j = 0; j < field; j++) {
        children.push(<Square key={j} />);
      }

      rows.push(
        <div className="board-row" key={i}>
          {children}
        </div>,
      );
    }

    const indexSquare = this.getIndex(0, field);
    const indexRow = this.getIndex(0, field);
    const item = rows[indexRow].props.children;

    const coordinatesArray = [];
    coordinatesArray.push(indexRow, indexSquare);

    this.setState(prevState => ({
      coordinates: [...prevState.coordinates, coordinatesArray],
    }));

    this.replaceArrayElement(
      item,
      indexSquare,
      1,
      <Square key={indexSquare} className="square-blue" onClick={e => this.handleClick(e)} />,
    );

    if (coordinates) {
      coordinates.forEach(arr =>
        this.replaceArrayElement(
          rows[arr[0]].props.children,
          arr[1],
          1,
          <Square key={arr[1]} className={isClicked ? 'square-green' : 'square-red'} />,
        ),
      );
    }

    this.setState({ rows, isClicked: false });
  };

  handleClick = event => {
    event.target.className = 'square-green';

    this.setState(prevState => ({
      clicks: ++prevState.clicks,
      isClicked: true,
    }));
  };

  render() {
    const { winners } = this.props;
    const { rows } = this.state;

    return (
      <div className="app">
        <div className="board-wrapper">
          <ActionBar setGameMode={this.setGameMode} setPlay={this.setPlay} />
          <Board rows={rows} generateGrid={this.generateGrid} />
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
