import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './LeaderBoard.scss';

const { array } = PropTypes;

class LeaderBoard extends Component {
  render() {
    const { winners } = this.props;

    return (
      <div className="leader-board">
        <h1>Leader Board</h1>
        {winners &&
          winners.map((value, index) =>
            <div key={index} className="leader-board__group">
              <div className="name">{value.winner}</div>
              <div className="date">{value.date}</div>
            </div>
          )}
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  winners: array,
};

export default LeaderBoard;
