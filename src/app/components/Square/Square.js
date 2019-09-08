import React from 'react';
import * as PropTypes from 'prop-types';

const { func, string } = PropTypes;

import './Square.scss';

const Square = ({ onClick, className }) =>
  <button className={className || 'square'} onClick={onClick} />
;

Square.propTypes = {
  onClick: func,
  className: string,
};

export default Square;
