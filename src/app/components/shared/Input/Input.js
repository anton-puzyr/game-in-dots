import React from 'react';
import * as PropTypes from 'prop-types';

import './Input.scss';

const { string, object } = PropTypes;

const Input = props => {
  const { meta: { touched, error } = {}, placeholder, name, input, type } = props;

  return (
    <div className="input-wrapper">
      <input className="input" name={name} type={type} placeholder={placeholder} {...input} />
      {touched && error && <div className="error">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  placeholder: string,
  name: string,
  input: object,
  meta: object,
  type: string,
};

export default Input;
