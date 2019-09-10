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
    redCoordinates: [],
    greenCoordinates: [],
    uniqCoordinates: [],
    clicks: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { field } = this.state;

    dispatch(getPresets());
    dispatch(getWinners());

    const uniqCoordinates = this.generateUniqueCoordinates(field);

    this.setState({ uniqCoordinates });
  }

  generateUniqueCoordinates = size => {
    const coordinates = [];

    for (let i = 0; coordinates.length < Math.pow(size, size); i++) {
      let col = this.getIndex(0, size);
      let row = this.getIndex(0, size);

      if (coordinates.filter(e => e !== [row, col])) {
        coordinates.push([row, col]);
      }
    }

    return this.onlyUniqArrayItems(coordinates);
  };

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

  onlyUniqArrayItems = data => Array.from(new Map(data.map(item => [item.join(), item])).values());

  shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  getRandomArrayIndexes = list => list[Math.floor(Math.random() * list.length)];

  generateGrid = () => {
    const { field, redCoordinates, greenCoordinates, uniqCoordinates } = this.state;
    let rows = [];

    /* Draw game board */
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

    /* Generate random square indexes */
    const randomArrayIndexes = this.getRandomArrayIndexes(this.shuffle(uniqCoordinates));

    this.setState({ uniqCoordinates: uniqCoordinates.filter(e => e !== randomArrayIndexes) });

    const indexSquare = this.getIndex(0, 5);
    const indexRow = this.getIndex(0, 5);
    const item = rows[indexRow].props.children;

    this.setState(prevState => ({
      redCoordinates: [...prevState.redCoordinates, [indexRow, indexSquare]],
    }));

    /* Set blue square */
    this.replaceArrayElement(
      item,
      indexSquare,
      1,
      <Square
        key={indexSquare}
        className="square-blue"
        onClick={e => this.handleClick(e, indexRow, indexSquare)}
      />,
    );

    /* Map red squares */
    redCoordinates.forEach(arr =>
      this.replaceArrayElement(
        rows[arr[0]].props.children,
        arr[1],
        1,
        <Square key={arr[1]} className="square-red" />,
      ),
    );

    /* Map green squares */
    greenCoordinates.forEach(arr =>
      this.replaceArrayElement(
        rows[arr[0]].props.children,
        arr[1],
        1,
        <Square key={arr[1]} className="square-green" />,
      ),
    );

    this.setState({ rows });
  };

  handleClick = (event, indexRow, indexSquare) => {
    event.target.className = 'square-green';

    this.setState(prevState => ({
      greenCoordinates: [...prevState.greenCoordinates, [indexRow, indexSquare]],
      clicks: ++prevState.clicks,
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
