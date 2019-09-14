import React from 'react';
import * as PropTypes from 'prop-types';
import CustomSelect from 'react-select';

import { selectStyles } from './Styles';
import DropdownIndicator from './DropdownIndicator';

const { string, object, array, bool } = PropTypes;

class Select extends React.Component {
  state = {
    selectedOption: null,
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.input.onChange(selectedOption);
  };

  render() {
    const { placeholder, options, meta: { touched, error } = {}, input } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="select">
        <CustomSelect
          {...input}
          components={{ DropdownIndicator }}
          value={selectedOption}
          options={options}
          placeholder={placeholder}
          onChange={value => this.handleChange(value)}
          onBlur={() => input.onBlur(input.value)}
          styles={selectStyles}
        />
        {touched && error && <div className="error">{error}</div>}
      </div>
    );
  }
}

Select.propTypes = {
  placeholder: string,
  options: array,
  error: string,
  touched: bool,
  meta: object,
  value: string,
  input: object,
};

export default Select;
