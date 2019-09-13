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
    playerName: '',
    rows: [],
    coordinates: [],
    redCoordinates: [],
    greenCoordinates: [],
    clicks: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { field } = this.state;

    dispatch(getPresets());
    dispatch(getWinners());

    const coordinates = this.generateIndexes(field);
    this.setState({ coordinates });
  }

  handleSubmit = values => {
    const { easyMode, normalMode, hardMode } = this.props.presets;
    const {
      mode: { value },
      playerName,
    } = values;

    switch (value) {
    case 'easy':
      this.setState({ preset: easyMode, isPlaying: true, playerName });
      break;
    case 'normal':
      this.setState({ preset: normalMode, isPlaying: true, playerName });
      break;
    case 'hard':
      this.setState({ preset: hardMode, isPlaying: true, playerName });
      break;
    }
  };

  generateIndexes = size => {
    let coordinates = [];

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        coordinates.push([i, j]);
      }
    }

    return coordinates;
  };

  replaceArrayElement = (arr, index, amount, element) => arr.splice(index, amount, element);

  getRandomArrayIndexes = list => list[Math.floor(Math.random() * list.length)];

  generateGrid = () => {
    const { field, coordinates, redCoordinates, greenCoordinates } = this.state;
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

    const indexes = this.getRandomArrayIndexes(coordinates);
    const item = rows[indexes[0]].props.children;

    this.setState(prevState => ({
      redCoordinates: [...prevState.redCoordinates, [indexes[0], indexes[1]]],
    }));

    /* Set blue square */
    this.replaceArrayElement(
      item,
      indexes[1],
      1,
      <Square
        key={indexes[1]}
        className="square-blue"
        onClick={e => this.handleClick(e, indexes[0], indexes[1])}
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

    let coordinatesCopy = coordinates.slice();

    coordinatesCopy.forEach((value, index) => {
      if (value === indexes) coordinatesCopy.splice(index, 1);
    });

    this.setState({ rows, coordinates: coordinatesCopy });
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
    const { rows, isPlaying } = this.state;

    return (
      <div className="app">
        <div className="board-wrapper">
          <ActionBar onSubmit={this.handleSubmit} />
          {isPlaying && <Board rows={rows} generateGrid={this.generateGrid} />}
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
  presets: state.dotsReducer.presets,
  winners: state.dotsReducer.winners,
});

export default connect(mapStateToProps)(App);
