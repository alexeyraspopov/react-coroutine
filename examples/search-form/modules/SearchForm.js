import React from 'react';
import Coroutine from '../../../modules/Coroutine';
import SearchAPI from './SearchAPI';

export default Coroutine.create(SearchForm);

async function* SearchForm({ query }) {
  yield <p>Searching "{query}"</p>;
  try {
    const results = await SearchAPI.retrieve(query);
    return <SearchResults results={results} />;
  } catch (error) {
    return <p>Oops...</p>;
  }
}

function SearchResults({ results }) {
  if (results.length === 0) {
    return <p>No results</p>;
  }

  return (
    <ul>
      {results.map((result) => (
        <li key={result.package.name}>{result.package.name} ({result.score.final})</li>
      ))}
    </ul>
  );
}
