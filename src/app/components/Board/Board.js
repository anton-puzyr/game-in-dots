import React, { Component } from 'react';

import Square from '../Square';
import './Board.scss';

export default class Game extends Component {
  state = {
    field: 5,
  };

  generateGrid = () => {
    const { field } = this.state;
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

    return rows;
  };

  render() {
    return <div className="board">{this.generateGrid()}</div>;
  }
}
