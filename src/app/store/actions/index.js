import axios from 'axios';

import { pending, success, failure } from './handleActions';
import {
  GET_PRESETS_PENDING,
  GET_PRESETS_SUCCESS,
  GET_PRESETS_ERROR,
  GET_WINNERS_PENDING,
  GET_WINNERS_SUCCESS,
  GET_WINNERS_ERROR,
  ADD_WINNER_PENDING,
  ADD_WINNER_SUCCESS,
  ADD_WINNER_ERROR,
} from '../types';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getPresets = () => dispatch => {
  dispatch(pending(GET_PRESETS_PENDING));

  return axios
    .get('/game-settings')
    .then(response => dispatch(success(response.data, GET_PRESETS_SUCCESS)))
    .catch(error => dispatch(failure(error, GET_PRESETS_ERROR)));
};

export const getWinners = () => dispatch => {
  dispatch(pending(GET_WINNERS_PENDING));

  return axios
    .get('/winners')
    .then(response => dispatch(success(response.data, GET_WINNERS_SUCCESS)))
    .catch(error => dispatch(failure(error, GET_WINNERS_ERROR)));
};

export const sendWinner = data => dispatch => {
  dispatch(pending(ADD_WINNER_PENDING));

  return axios
    .put('/winners', data)
    .then(response => dispatch(success(response.data, ADD_WINNER_SUCCESS)))
    .catch(error => dispatch(failure(error, ADD_WINNER_ERROR)));
};
