import React from 'react';
import Coroutine from '../../../modules/Coroutine';

export default Coroutine.create(SearchForm);

async function* SearchForm({ query }) {
  yield <p>Searching "{query}"</p>;
}
