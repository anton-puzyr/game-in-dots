import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import './ActionBar.scss';

const { func } = PropTypes;

class ActionBar extends Component {
  render() {
    const { setGameMode, setPlay } = this.props;
    const gameModes = ['Easy', 'Normal', 'Hard'];

    return (
      <div className="action-bar">
        <select defaultValue="easy" onChange={event => setGameMode(event.target.value)}>
          <option value="easy" disabled>
            Pick game mode
          </option>
          {gameModes.map((currentValue, index) => {
            return (
              <option key={index} value={currentValue.toLowerCase()}>
                {currentValue}
              </option>
            );
          })}
        </select>
        <input type="text" placeholder="Enter your name" />
        <button type="button" onClick={setPlay}>
          Play
        </button>
      </div>
    );
  }
}

ActionBar.propTypes = {
  setGameMode: func,
  setPlay: func,
};

export default ActionBar;
