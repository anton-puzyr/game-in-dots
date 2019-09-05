import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './store/reducers';
import App from './containers/App';
import './main.scss';

const store = createStore(reducer, applyMiddleware(thunk));

const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
