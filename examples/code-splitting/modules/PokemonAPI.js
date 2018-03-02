class Pokemons {
  async retrieve(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    return response.json();
  }
}

export default new Pokemons();
