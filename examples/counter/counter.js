import React from 'react';
import ReactDOM from 'react-dom';
import Coroutine from '../../src/Coroutine';

async function Counter({ variables, forceUpdate }) {
  return (
    <section>
      <button onClick={() => forceUpdate({ counter: variables.counter + 1 })}>
        increment
      </button>

      <output>
        {variables.counter}
      </output>
    </section>
  );
}

const CounterCo = Coroutine.create(Counter, { counter: 0 });

ReactDOM.render(<CounterCo />, document.querySelector('main'));
