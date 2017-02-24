import React from 'react';

export default function App({ children }) {
  return (
    <article>
      <h1>Pokemons</h1>
      { children }
    </article>
  );
}
