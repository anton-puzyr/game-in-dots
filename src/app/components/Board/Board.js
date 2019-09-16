import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './Board.scss';

const { func, array, object, string } = PropTypes;

class Board extends Component {
  componentDidMount() {
    const {
      drawGameBoard,
      preset: { field, delay },
    } = this.props;

    drawGameBoard(field);
    setInterval(() => drawGameBoard(field), delay);
  }

  render() {
    const { winner, rows } = this.props;

    return <div className={winner ? 'board-hover' : 'board'}>{rows}</div>;
  }
}

Board.propTypes = {
  drawGameBoard: func,
  rows: array,
  preset: object,
  winner: string,
};

export default Board;
