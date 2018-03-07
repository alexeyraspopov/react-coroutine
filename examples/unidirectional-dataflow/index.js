import React from 'react';
import ReactDOM from 'react-dom';
import Coroutine from 'react-coroutine';
import AsyncQueue from './modules/AsyncQueue';
import AppContext from './modules/AppContext';
import AppStateRecord from './modules/AppStateRecord';
import App from './modules/App';
import Counter from './modules/Counter';

let state = new AppStateRecord();
let actions = new AsyncQueue();

function reduce(state, action) {
  switch (action) {
    case 'INCREMENT':
      return state.copy({ counter: state.counter + 1 });
    default:
      return state;
  }
}

ReactDOM.render(
  <App state={state} actions={actions} reduce={reduce}>
    <Counter />
  </App>,
  document.querySelector('main')
);
