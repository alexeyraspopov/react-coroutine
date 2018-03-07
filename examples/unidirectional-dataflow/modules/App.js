import React from 'react';
import Coroutine from 'react-coroutine';
import AppContext from './AppContext';

export default Coroutine.create(App);

async function* App({ state, actions, reduce, children }) {
  // Rendering initial state, immediately
  yield (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
  // Awaiting for the next action, updating state, re-rendering
  for await (let action of actions) {
    state = reduce(state, action);
    yield (
      <AppContext.Provider value={{ state, actions }}>
        {children}
      </AppContext.Provider>
    );
  }
}
