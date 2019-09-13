export const selectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: isFocused ? 'rgb(24, 154, 211)' : '#CCCCCC',
    '&:hover': {
      transition: '.2s ease-out',
      borderColor: 'rgb(24, 154, 211)',
    },
    boxShadow: 0,
    backgroundColor: '#FFF',
    fontSize: 14,
    fontWeight: 600,
    height: 40,
    width: 200,
    whiteSpace: 'nowrap',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? 'rgba(24, 154, 211, 0.3)' : '',
    color: isDisabled ? '#ccc' : isSelected ? '#000' : '#000',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover': {
      transition: '.2s ease-out',
    },
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: 18,
    paddingRight: 18,
    cursor: 'pointer',
  }),
  menuList: styles => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
    '&::-webkit-scrollbar': {
      width: 3,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
    },
  }),
  input: styles => ({
    ...styles,
    color: '#000',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 600,
  }),
  placeholder: (styles, { isFocused }) => ({
    ...styles,
    color: '#999999',
    fontSize: 14,
    paddingLeft: 0,
    display: isFocused ? 'none' : 'block',
  }),
  valueContainer: styles => ({
    ...styles,
    paddingLeft: 12,
  }),
  clearIndicator: styles => ({
    ...styles,
    width: 30,
    cursor: 'pointer',
  }),
  indicatorSeparator: () => undefined,
  menu: style => ({
    ...style,
    boxShadow: 0,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 2,
    marginTop: 2,
    width: 200,
  }),
};