import React from 'react';
import Coroutine from 'react-coroutine';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Pokemons from './PokemonAPI';

/* Routes are using wrapped by Coroutine components for the sake of
   async functions and generators usage. */
export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Coroutine.create(PokemonListLoader)} />
      <Route path=":pokemonId" component={Coroutine.create(PokemonInfoLoader)} />
    </Route>
  </Router>
);

/* Async function that is used as a component and provides
   actual `PokemonList` once it becomes imported via async `import()`. */
async function PokemonListLoader() {
  /* You might wonder why it doesn't writtent in the way `await import()`.
     Well, that will be fixed once https://github.com/webpack/webpack/issues/3925
     is fixed. */
  const module = import('./PokemonList');
  /* Module is an object that keeps all exports from particular file.
     You can think about the result as `import * as module from '...'`.*/
  const { default: PokemonList } = await module;
  return <PokemonList />;
}

/* Async generator that is used as a component for /:pokemonId page.
   It imports `PokemonInfo` component and fetches particular pokemon data
   using API. */
async function* PokemonInfoLoader({ params }) {
  /* This component is rendered every time the user opens a pokemon profile.
     However, `PokemonInfo` component will be loaded only once. After first
     usage `import('./PokemonInfo')` just returns resolved promise with module. */
  const module = import('./PokemonInfo');
  /* This request can also be cached but that's API's implementation detail.
     For the example purpose, it just do new request all the time. */
  const pokemonInfo = Pokemons.retrieve(params.pokemonId);
  /* Since API request takes time, we show a pending message immediately
     and then wait for requests resolving. */
  yield <p>Loading...</p>;
  /* Promise.all is used pretty much for example purpose. However, it's
     efficient way to make concurrent requests. */
  const [{ default: PokemonInfo }, data] = await Promise.all([module, pokemonInfo]);
  return <PokemonInfo data={data} />;
}
