Next list of small code examples attempts to show the advantages of React Coroutine in solving different tasks.

## [Code Splitting](https://github.com/alexeyraspopov/react-coroutine/blob/master/examples/code-splitting)

An example of coroutines usage for async data fetching and dynamic imports.

    import React from 'react';
    import Coroutine from 'react-coroutine';
    import { BrowserRouter as Router, Route } from 'react-router-dom';
    import Pokemons from './PokemonAPI';

    export default (
      <Router>
        <article>
          <h1>Pokemons</h1>
          <Route exact path="/" component={Coroutine.create(PokemonListLoader)} />
          <Route exact path="/:pokemonId" component={Coroutine.create(PokemonInfoLoader)} />
        </article>
      </Router>
    );

    async function PokemonListLoader() {
      const { default: PokemonList } = await import('./PokemonList');
      return <PokemonList />;
    }

    async function* PokemonInfoLoader({ match }) {
      const module = import('./PokemonInfo');
      const pokemonInfo = Pokemons.retrieve(match.params.pokemonId);
      yield <p>Loading...</p>;
      const [{ default: PokemonInfo }, data] = await Promise.all([module, pokemonInfo]);
      return <PokemonInfo data={data} />;
    }

## [Search Form](https://github.com/alexeyraspopov/react-coroutine/blob/master/examples/search-form)

An example of progressive rendering with loading spinner and requests debouncing.

    import React from 'react';
    import Coroutine from 'react-coroutine';
    import SearchAPI from './SearchAPI';
    import SearchResults from './SearchResults';
    import ErrorMessage from './ErrorMessage';

    export default Coroutine.create(SearchForm);

    async function* SearchForm({ query }) {
      if (query.length === 0) return null;

      yield <p>Searching {query}...</p>;

      try {
        const { results } = await SearchAPI.retrieve(query);
        return <SearchResults results={results} />;
      } catch (error) {
        return <ErrorMessage error={error} />;
      }
    }
