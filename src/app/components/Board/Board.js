import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './Board.scss';

const { func, array, object } = PropTypes;

class Board extends Component {
  componentDidMount() {
    const {
      drawGameBoard,
      preset: { field, delay },
    } = this.props;

    drawGameBoard(field);
    setInterval(() => drawGameBoard(field), 500);
  }

  render() {
    return <div className="board">{this.props.rows}</div>;
  }
}

Board.propTypes = {
  drawGameBoard: func,
  rows: array,
  preset: object,
};

export default Board;
