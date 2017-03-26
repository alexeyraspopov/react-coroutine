import debounce from './Debounce';

class Search {
  constructor() {
    this.retrieve = debounce(this.retrieve.bind(this));
  }

  async retrieve(query) {
    const response = await fetch(`https://api.npms.io/v2/search?from=0&size=25&q=${query}`);

    if (response.ok) {
      return response.json();
    }

    throw new Error(await response.text());
  }
}

export default new Search();
