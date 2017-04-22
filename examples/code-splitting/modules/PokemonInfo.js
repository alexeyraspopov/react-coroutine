import React from 'react';
import { Link } from 'react-router-dom';

export default function PokemonInfo({ data }) {
  return (
    <section>
      <Link to="/">&larr; Back</Link>
      <h3>{data.name}</h3>
      <img src={data.sprites.front_default} />
    </section>
  );
}
