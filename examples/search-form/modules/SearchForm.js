import React from 'react';
import Coroutine from 'react-coroutine';
import SearchAPI from './SearchAPI';
import SearchResults from './SearchResults';
import ErrorMessage from './ErrorMessage';

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
    const { results } = await SearchAPI.retrieve(query);
    return <SearchResults results={results} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}
