import React from 'react';
import Coroutine from 'react-coroutine';
import { Motion, spring } from 'react-motion';
import { AsyncQueue } from 'async-structure';

export default Coroutine.create(AppCoroutine);

async function* AppCoroutine() {
  let values = new AsyncQueue();
  let onChange = value => values.enqueue(value);

  // enqueue initial value
  values.enqueue(0);

  for await (let counter of values) {
    yield <CounterView counter={counter} onCounterChange={onChange} />;
  }
}

function CounterView({ counter, onCounterChange }) {
  let onChange = event => onCounterChange(parseFloat(event.target.value));

  return (
    <section>
      <input type="range" value={counter} onChange={onChange} />
      <Motion style={{ x: spring(counter) }}>
        {({ x }) => <p>Selected value: {x.toFixed(0)}</p>}
      </Motion>
    </section>
  );
}
