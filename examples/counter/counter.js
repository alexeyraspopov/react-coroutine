import React from 'react';
import ReactDOM from 'react-dom';
import Coroutine from '../../src/Coroutine';

async function Counter({ counter, forceUpdate }) {
  return (
    <section>
      <button onClick={() => forceUpdate({ counter: counter + 1 })}>
        increment
      </button>

      <output>
        {counter}
      </output>
    </section>
  );
}

const CounterCo = Coroutine.create(Counter, () => ({ counter: 0 }));

ReactDOM.render(<CounterCo />, document.querySelector('main'));
