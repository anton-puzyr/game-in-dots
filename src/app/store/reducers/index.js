import { GET_PRESETS_PENDING, GET_PRESETS_SUCCESS, GET_PRESETS_ERROR } from '../types';

const initialState = {
  pending: false,
  presets: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_PRESETS_PENDING:
    return {
      ...state,
      pending: action.pending,
    };
  case GET_PRESETS_SUCCESS:
    return {
      ...state,
      presets: action.data,
      pending: action.pending,
    };
  case GET_PRESETS_ERROR:
    return {
      error: action.error,
      pending: action.pending,
    };
  default:
    return state;
  }
};

export default reducer;
