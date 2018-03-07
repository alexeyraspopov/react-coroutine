import React from 'react';
import AppContext from './AppContext';

export default function Counter() {
  return (
    <AppContext.Consumer>
      {({ state, actions }) => (
        <section>
          <p>{ state.counter }</p>
          <button onClick={() => actions.enqueue('INCREMENT')}>Increment</button>
        </section>
      )}
    </AppContext.Consumer>
  );
}
