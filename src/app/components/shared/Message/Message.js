import React from 'react';
import * as PropTypes from 'prop-types';

const { string } = PropTypes;

import './Message.scss';

const Message = ({ text }) =>
  <div className="message">
    To win:&nbsp;
    <p className={text === 'Computer' ? 'win-computer' : 'win-user'}>{text}</p>
  </div>
;
Message.propTypes = {
  text: string,
};

export default Message;
