import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './Board.scss';

const { func, array } = PropTypes;

class Game extends Component {
  componentDidMount() {
    const { generateGrid } = this.props;

    generateGrid();
    setInterval(() => generateGrid(), 2000);
  }

  render() {
    return <div className="board">{this.props.rows}</div>;
  }
}

Game.propTypes = {
  generateGrid: func,
  rows: array,
};

export default Game;
