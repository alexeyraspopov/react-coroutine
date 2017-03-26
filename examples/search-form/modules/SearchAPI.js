import debounce from './Debounce';

class Search {
  constructor() {
    this.retrieve = debounce(this.retrieve.bind(this));
  }

  async retrieve(query) {
    if (!query) return [];
    const response = await fetch(`https://api.npms.io/v2/search?from=0&size=25&q=${query}`);
    const { results, total } = await response.json();
    return results;
  }
}

export default new Search();
