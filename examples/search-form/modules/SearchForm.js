import React from 'react';
import Coroutine from '../../../modules/Coroutine';
import SearchAPI from './SearchAPI';

export default Coroutine.create(SearchForm);

async function* SearchForm({ query }) {
  yield <p>Searching {query}...</p>;
  try {
    const results = await SearchAPI.retrieve(query);
    return <SearchResults results={results} />;
  } catch (error) {
    return <p>Something went wrong!</p>;
  }
}

function SearchResults({ results }) {
  return results.length === 0 ? (
    <p>No results</p>
  ) : (
    <ul>
      {results.map((result) => (
        <li key={result.package.name}>{result.package.name} ({result.score.final})</li>
      ))}
    </ul>
  );
}
