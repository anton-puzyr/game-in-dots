import { components } from 'react-select';
import React from 'react';

import ArrowDown from '../../../../../assets/icons/arrow-down.svg';

export const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDown />
    </components.DropdownIndicator>
  );
};
