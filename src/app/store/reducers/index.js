import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dotsReducer from './reducer';

const reducers = {
  dotsReducer,
  form: formReducer,
};

export const reducer = combineReducers(reducers);
