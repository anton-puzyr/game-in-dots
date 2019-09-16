import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

import { getPresets, getWinners, addWinner } from '../../store/actions';
import ActionBar from '../../components/ActionBar';
import Board from '../../components/Board';
import LeaderBoard from '../../components/LeaderBoard';
import Square from '../../components/Square';
import Message from '../../components/shared/Message';
import './App.scss';

const { func, object, array } = PropTypes;

class App extends Component {
  state = {
    preset: {},
    isPlaying: false,
    playerName: '',
    rows: [],
    coordinates: [],
    redCoordinates: [],
    greenCoordinates: [],
    winner: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getPresets());
    dispatch(getWinners());
  }

  handleSubmit = values => {
    const { easyMode, normalMode, hardMode } = this.props.presets;
    const {
      mode: { value },
      playerName,
    } = values;

    this.setState({
      playerName,
      isPlaying: true,
      winner: '',
      redCoordinates: [],
      greenCoordinates: [],
    });

    switch (value) {
    case 'easy':
      this.setState({
        preset: easyMode,
        coordinates: this.generateIndexes(easyMode.field),
      });
      break;
    case 'normal':
      this.setState({
        preset: normalMode,
        coordinates: this.generateIndexes(normalMode.field),
      });
      break;
    case 'hard':
      this.setState({
        preset: hardMode,
        coordinates: this.generateIndexes(hardMode.field),
      });
      break;
    }
  };

  generateDate = () => {
    const dt = new Date();
    const year = `${dt.getFullYear()}`;
    const day = `${dt.getDate()} `;
    const time = `${dt.getHours()}:${dt.getMinutes()}`;
    const month = dt.toLocaleString('default', { month: 'long' });

    return `${time}; ${day}${month} ${year}`;
  };

  calculateWinner = () => {
    const {
      preset: { field },
      redCoordinates,
      greenCoordinates,
      playerName,
    } = this.state;
    const progress = field * field / 2;

    if (redCoordinates.length > progress) {
      this.setState({ winner: 'Computer' });
    } else if (greenCoordinates.length > progress) {
      this.setState({ winner: playerName });
    }
  };

  sendWinner = name => {
    const { dispatch } = this.props;
    const date = this.generateDate();

    dispatch(addWinner({ winner: name, date }));
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

  drawGameBoard = size => {
    const { coordinates, winner } = this.state;
    let rows = [];

    for (let i = 0; i < size; i++) {
      let children = [];

      for (let j = 0; j < size; j++) {
        children.push(<Square key={j} />);
      }

      rows.push(
        <div className="board-row" key={i}>
          {children}
        </div>,
      );
    }

    let indexes = this.getRandomArrayIndexes(coordinates);
    this.updateCoordinates(indexes);

    !winner && this.replaceSquares(rows, indexes);
  };

  updateCoordinates = indexes => {
    const { coordinates } = this.state;
    let updated = coordinates.filter(el => el !== indexes);

    this.setState({ coordinates: updated });
  };

  replaceSquares = (rows, indexes) => {
    const { redCoordinates, greenCoordinates } = this.state;
    const item = rows[indexes[0]].props.children;

    this.setState(prevState => ({
      redCoordinates: [...prevState.redCoordinates, indexes],
    }));

    /** Set blue square */
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

    /** Set red squares */
    redCoordinates.forEach(arr =>
      this.replaceArrayElement(
        rows[arr[0]].props.children,
        arr[1],
        1,
        <Square key={arr[1]} className="square-red" />,
      ),
    );

    /** Set green squares */
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
    }));
  };

  render() {
    const { winners } = this.props;
    const { rows, isPlaying, preset, winner } = this.state;

    return (
      <div className="app">
        <div className="board-wrapper">
          <ActionBar onSubmit={this.handleSubmit} />
          <div className="board-wrapper__winner">{winner && <Message text={winner} />}</div>
          {isPlaying &&
            <Board winner={winner} rows={rows} drawGameBoard={this.drawGameBoard} preset={preset} />
          }
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
