import React from 'react';
import { Link } from 'react-router-dom';

export default function PokemonInfo({ data }) {
  return (
    <section>
      <Link to="/">&larr; Back</Link>
      <pre>{ JSON.stringify(data, null, 2) }</pre>
    </section>
  );
}
