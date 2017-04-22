# react-coroutine

React Components as Coroutines.

> **Coroutines** are computer program components that generalize subroutines for nonpreemptive multitasking, by allowing multiple entry points for suspending and resuming execution at certain locations. Coroutines are well-suited for implementing more familiar program components such as cooperative tasks, exceptions, event loop, iterators, infinite lists and pipes.  
> — _[Wikipedia](https://en.wikipedia.org/wiki/Coroutine)_

```javascript
import React from 'react';
import Coroutine from 'react-coroutine';

async function UserListContainer() {
  try {
    const users = await Users.retrieve();
    return <UserList users={users} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}

export default Coroutine.create(UserListContainer);
```

## Install

    npm install -S react-coroutine

## Usage

See [docs](./docs/) for more.

## List of projects that can be built with react-coroutine

React Coroutine attempts to use basic language features for the sake of solving problems that are usually solved with APIs and new abstractions that require particular knowledge about them and sometimes about internal processes (leaky abstractions).

 * [react-refetch](https://github.com/heroku/react-refetch)
 * [react-transmit](https://github.com/RickWong/react-transmit)
 * [react-loadable](https://github.com/thejameskyle/react-loadable)
 * [smalldots](https://github.com/smalldots/smalldots)
 * [react-controller](https://github.com/bradestey/react-controller)
