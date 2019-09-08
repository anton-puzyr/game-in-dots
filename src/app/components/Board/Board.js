import React, { Component } from 'react';

import Square from '../Square';
import './Board.scss';

export default class Game extends Component {
  state = {
    field: 5,
    rows: [],
  };

  componentDidMount() {
    this.generateGrid();
    setInterval(() => this.generateGrid(), 2000);
  }

  getIndex = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
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

    const index = this.getIndex(0, field);
    const item = rows[this.getIndex(0, field)].props.children;

    item.splice(
      index,
      1,
      <Square key={index} className="square-blue" onClick={this.handleClick(index)} />,
    );

    this.setState({ rows });
  };

  handleClick = index => {
    console.log('click', index);
  };

  render() {
    return <div className="board">{this.state.rows}</div>;
  }
}
