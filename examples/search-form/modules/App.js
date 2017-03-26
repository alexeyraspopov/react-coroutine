import React from 'react';
import SearchForm from './SearchForm';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { query: '' };
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(event) {
    const query = event.target.value;
    this.setState(() => ({ query }));
  }

  render() {
    return (
      <article>
        <input value={this.state.query} onChange={this.handleEvent} />
        <SearchForm query={this.state.query} />
      </article>
    );
  }
}
