import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

import { getPresets } from '../../store/actions';
import './App.scss';

const { func } = PropTypes;

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getPresets());
  }

  render() {
    return <div className="app">Dots</div>;
  }
}

App.propTypes = {
  dispatch: func,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
