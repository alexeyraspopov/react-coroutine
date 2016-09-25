import { PokemonListLoader, PokemonLoader } from './PokemonLoader';
import { Pokemon } from './PokemonRecord';
import { List } from 'immutable';

class Pokemons {
  async retrieve(offset = 0, limit = 20) {
    const { results } = await PokemonListLoader.load([offset, limit]);
    const pokemons = await PokemonLoader.loadMany(results.map(data => data.name));

    return new List(pokemons.map(data => new Pokemon(data))).toMap().mapKeys((k, v) => v.name);
  }
}

export default new Pokemons();
