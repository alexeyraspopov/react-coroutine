import DataLoader from 'dataloader';

export const PokemonListLoader = new DataLoader(keys => {
  const promises = keys.map(async ([offset, limit]) => {
    const query = new URLSearchParams();
    query.append('offset', offset);
    query.append('limit', limit);

    const response = await fetch(`http://pokeapi.co/api/v2/pokemon/?${query}`);
    return response.json();
  });

  return Promise.all(promises);
}, {
  cacheKeyFn(range) {
    return range.join();
  }
});

export const PokemonLoader = new DataLoader(keys => {
  const promises = keys.map(async key => {
    const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${key}/`);
    return response.json();
  });

  return Promise.all(promises);
});
