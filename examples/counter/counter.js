import React from 'react';
import ReactDOM from 'react-dom';
import Coroutine from '../../modules/Coroutine';

function getVariables() {
  return { counter: 0 };
}

async function Counter({ name, counter, forceUpdate }) {
  return (
    <section>
      <button onClick={() => forceUpdate({ counter: counter + 1 })}>
        increment
      </button>

      <output>
        {name}: {counter}
      </output>
    </section>
  );
}

const CounterCo = Coroutine.create(Counter, getVariables);

ReactDOM.render(<CounterCo name="Things count" />, document.querySelector('main'));
