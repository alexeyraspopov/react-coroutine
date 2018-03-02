import React from 'react';
import Coroutine from 'react-coroutine';

export default Coroutine.create(Placeholder);

async function Placeholder({ delay, children }) {
  await new Promise(resolve => setTimeout(resolve, delay));
  return children;
}
