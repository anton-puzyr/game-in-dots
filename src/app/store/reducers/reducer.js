import {
  GET_PRESETS_PENDING,
  GET_WINNERS_PENDING,
  GET_PRESETS_SUCCESS,
  GET_WINNERS_SUCCESS,
  GET_PRESETS_ERROR,
  GET_WINNERS_ERROR,
  ADD_WINNER_PENDING,
  ADD_WINNER_SUCCESS,
  ADD_WINNER_ERROR,
} from '../types';

const initialState = {
  pending: false,
  presets: {},
  error: null,
};

const dotsReducer = (state = initialState, action) => {
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
  case GET_WINNERS_PENDING:
    return {
      ...state,
      pending: action.pending,
    };
  case GET_WINNERS_SUCCESS:
    return {
      ...state,
      winners: action.data,
      pending: action.pending,
    };
  case GET_WINNERS_ERROR:
    return {
      error: action.error,
      pending: action.pending,
    };
  case ADD_WINNER_PENDING:
    return {
      ...state,
      pending: action.pending,
    };
  case ADD_WINNER_SUCCESS:
    return {
      ...state,
      winners: [...state.winners, action.data],
      pending: action.pending,
    };
  case ADD_WINNER_ERROR:
    return {
      error: action.error,
      pending: action.pending,
    };
  default:
    return state;
  }
};

export default dotsReducer;
