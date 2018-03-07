import debounce from './Debounce';

class Search {
  constructor() {
    /* The method is debounced for the sake of not doing unnecessary HTTP requests. */
    this.retrieve = debounce(this.retrieve.bind(this));
  }

  async retrieve(query) {
    /* npms.io search API is used in this example. Good stuff.*/
    let response = await fetch(`https://api.npms.io/v2/search?from=0&size=25&q=${query}`);

    if (response.ok) {
      return response.json();
    }

    /* If API returns some weird stuff and not 2xx, convert it to error and show
       on the screen. */
    throw new Error(await response.text());
  }
}

export default new Search();
