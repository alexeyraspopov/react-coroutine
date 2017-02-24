import React from 'react';
import { Link } from 'react-router';

const pokemons = [
  { id: 1, name: "Bulbasaur" },
  { id: 2, name: "Ivysaur" },
  { id: 3, name: "Venusaur" },
  { id: 4, name: "Charmander" },
  { id: 5, name: "Charmeleon" },
  { id: 6, name: "Charizard" },
  { id: 7, name: "Squirtle" },
  { id: 8, name: "Wartortle" },
  { id: 9, name: "Blastoise" },
];

export default function PokemonList() {
  return (
    <section>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>
            <Link to={`/${pokemon.id}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
