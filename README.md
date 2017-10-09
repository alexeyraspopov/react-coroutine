# react-coroutine

    npm install react-coroutine

> **Coroutines** are computer program components that generalize subroutines for nonpreemptive multitasking, by allowing multiple entry points for suspending and resuming execution at certain locations. Coroutines are well-suited for implementing more familiar program components such as cooperative tasks, exceptions, event loop, iterators, infinite lists and pipes.  
> — _[Wikipedia](https://en.wikipedia.org/wiki/Coroutine)_

Use async [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and [generators](https://github.com/tc39/proposal-async-iteration) to render React components based on async state.

```javascript
import React from 'react';
import Coroutine from 'react-coroutine';
```

```javascript
async function UserListContainer() {
  try {
    // Wait for async data and render it in the same way as plain components
    const users = await Users.retrieve();
    return <UserList users={users} />;
  } catch (error) {
    // Handle failures in place with just JavaScript tools
    return <ErrorMessage error={error} />;
  }
}

export default Coroutine.create(UserListContainer);
```

```javascript
async function* PokemonInfoPage({ pokemonId, pokemonName }) {
  // Use generators to provide multiple render points of your async component
  yield <p>Loading {pokemonName} info...</p>;

  // Easily import components asynchronously and render them on demand
  const { default: PokemonInfo } = await import('./PokemonInfo.react');
  const data = await PokemonAPI.retrieve(pokemonId);

  return <PokemonInfo data={data} />;
}

export default Coroutine.create(PokemonInfoPage);
```

```javascript
class MyComponent extends Coroutine {
  async observe() {
    try {
      const users = await Users.retrieve();
      return { status: 'success', users };
    } catch (error) {
      return { status: 'failure', error };
    }
  }

  render() {
    const { data: { status, users, error } } = this.state
    switch (status) {
    case 'success':
      return <UserList users={users} />;
    case 'failure':
      return <ErrorMessage error={error} />;
    default:
      return <Loading />;
    }
  }
}
```

## Usage

See [details page](https://react-coroutine.js.org/Details.html) for more.

## List of projects that can be built with react-coroutine

React Coroutine attempts to use basic language features for the sake of solving problems that are usually solved with APIs and new abstractions that require particular knowledge about them and sometimes about internal processes (leaky abstractions).

 * [react-async](https://github.com/andreypopp/react-async)
 * [react-refetch](https://github.com/heroku/react-refetch)
 * [react-transmit](https://github.com/RickWong/react-transmit)
 * [react-loadable](https://github.com/thejameskyle/react-loadable)
 * [react-resolver](https://github.com/ericclemmons/react-resolver)
 * [react-controller](https://github.com/bradestey/react-controller)
 * [react-async-component](https://github.com/ctrlplusb/react-async-component)
 * [smalldots](https://github.com/smalldots/smalldots)
 * [holen](https://github.com/tkh44/holen)
