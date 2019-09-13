import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './Board.scss';

const { func, array, number } = PropTypes;

class Board extends Component {
  componentDidMount() {
    const { generateGrid, delay } = this.props;

    generateGrid();
    setInterval(() => generateGrid(), delay);
  }

  render() {
    return <div className="board">{this.props.rows}</div>;
  }
}

Board.propTypes = {
  generateGrid: func,
  rows: array,
  delay: number,
};

export default Board;
