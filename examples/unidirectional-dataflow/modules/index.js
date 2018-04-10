import React from 'react';
import ReactDOM from 'react-dom';
import Coroutine from 'react-coroutine';
import { AsyncQueue } from 'async-structure';
import AppContext from './AppContext';
import AppStateRecord from './AppStateRecord';
import App from './App';
import Counter from './Counter';

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
