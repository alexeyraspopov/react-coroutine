import React from 'react';
import Coroutine from 'react-coroutine';
import SearchAPI from './SearchAPI';

/* A coroutine becomes a React component via this wrapper. */
export default Coroutine.create(SearchForm);

/* Async generator is used as a component that represents a stateful component
   with search results. The same rules are applicable as to functional component.
   The main difference comparing to plain functional component is that async generator
   yields particular UI state and then performs additional actions (awaitg for data)
   to create and yield new UI state. */
/* If you don't know what the thing is async generator, check the TC39 proposal:
   https://github.com/tc39/proposal-async-iteration#async-generator-functions */
async function* SearchForm({ query }) {
  /* Not really important. There is nothing to show if query is empty. */
  if (query.length === 0) return null;

  /* This call does not finish the execution of the component. It just provides a
     state of UI and then doing another stuff. */
  yield <p>Searching {query}...</p>;

  try {
    /* This piece is the same as with async functions. Some data is fetched and
       used with another plain functional component. */
    let { results } = await SearchAPI.retrieve(query);
    return <SearchResults results={results} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}

function SearchResults({ results }) {
  return results.length === 0 ? (
    <p>No results</p>
  ) : (
    <ul>
      {results.map((result) => (
        <li key={result.package.name}>
          <h3 className="package-name"><a href={result.package.links.npm} target="_blank">{result.package.name}</a> <small className="package-version">({result.package.version})</small></h3>
          <p className="package-description">{result.package.description}</p>
        </li>
      ))}
    </ul>
  );
}

function ErrorMessage({ error }) {
  return (
    <details>
      <summary>Something went wrong!</summary>
      <p>{error.message}</p>
    </details>
  );
}
