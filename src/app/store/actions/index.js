import axios from 'axios';

import { pending, success, failure } from './handleActions';
import { GET_PRESETS_PENDING, GET_PRESETS_SUCCESS, GET_PRESETS_ERROR } from '../types';

export const getPresets = () => dispatch => {
  dispatch(pending(GET_PRESETS_PENDING));

  return axios
    .get('http://starnavi-frontend-test-task.herokuapp.com/game-settings')
    .then(response => dispatch(success(response.data, GET_PRESETS_SUCCESS)))
    .catch(error => dispatch(failure(error, GET_PRESETS_ERROR)));
};
