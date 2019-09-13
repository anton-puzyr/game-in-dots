import React from 'react';
import * as PropTypes from 'prop-types';

const { string } = PropTypes;

import './Message.scss';

const Message = ({ text }) =>
  <div className="message">
    To win:&nbsp;
    <p className={text === 'user' ? 'win-user' : 'win-computer'}>{text}</p>
  </div>
;

Message.propTypes = {
  text: string,
};

export default Message;
