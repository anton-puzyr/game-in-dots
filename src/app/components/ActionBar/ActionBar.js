import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Button from '../shared/Button';
import Input from '../shared/Input';
import Select from '../shared/Select';
import { required, maxLength15 } from '../shared/validators';
import './ActionBar.scss';

const { func, bool } = PropTypes;

class ActionBar extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    const options = [
      { label: 'Easy', value: 'easy' },
      { label: 'Normal', value: 'normal' },
      { label: 'Hard', value: 'hard' },
    ];

    return (
      <form onSubmit={handleSubmit}>
        <div className="action-bar">
          <Field
            name="mode"
            type="text"
            placeholder="Pick game mode"
            options={options}
            component={Select}
            validate={required}
          />
          <Field
            name="playerName"
            type="text"
            placeholder="Enter your name"
            component={Input}
            validate={[required, maxLength15]}
          />
          <Button type="submit" text="Play" disabled={submitting} />
        </div>
      </form>
    );
  }
}

ActionBar.propTypes = {
  setGameMode: func,
  setPlay: func,
  handleSubmit: func,
  submitting: bool,
};

export default reduxForm({ form: 'action-bar' })(ActionBar);
