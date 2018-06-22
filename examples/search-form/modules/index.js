import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event) {
    let query = event.target.value;
    this.setState(() => ({ query }));
  }

  render() {
    return (
      <article>
        <h1>NPM Search</h1>
        <input
          value={this.state.query}
          placeholder="Search for Node packages..."
          onChange={this.handleEvent} />
        <SearchForm query={this.state.query} />
      </article>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('main'));
