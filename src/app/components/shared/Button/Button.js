import React from 'react';
import * as PropTypes from 'prop-types';

import './Button.scss';

const { func, bool, string } = PropTypes;

const Button = ({ text, type, disabled, onClick }) => {
  return (
    <button className="button" type={type} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: string,
  type: string,
  disabled: bool,
  onClick: func,
};

export default Button;
