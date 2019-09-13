import React from 'react';
import * as PropTypes from 'prop-types';

const { string } = PropTypes;

import './Message.scss';

const Message = ({ text }) => <div className="message">{text}</div>;
Message.propTypes = {
  text: string,
};

export default Message;
