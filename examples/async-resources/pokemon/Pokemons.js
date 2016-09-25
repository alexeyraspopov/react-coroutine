import { PokemonListLoader, PokemonLoader } from './PokemonLoader';
import { Pokemon } from './PokemonRecord';
import { Map } from 'immutable';

class Pokemons {
  async retrieve(offset = 0, limit = 20) {
    const { results } = await PokemonListLoader.load([offset, limit]);
    const pokemons = await PokemonLoader.loadMany(results.map(data => data.name));
    const entries = pokemons.map(data => [data.name, new Pokemon(data)]);

    return new Map(entries);
  }
}

export default new Pokemons();
