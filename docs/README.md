## Overview

React Coroutine is a small library which leverages the power of modern JavaScript to provide seamless way in creating stateful components with different purposes.

## [](#install)Install

`react-coroutine` is [available](https://www.npmjs.com/package/react-coroutine) in NPM registry and can be installed both via [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/).

```
npm install react-coroutine
```

## Usage

```javascript
import React from 'react';
import Coroutine from 'react-coroutine';
import Posts from 'PostAPI';
import PostList from 'PostList.react';

async function PostListCo() {
  try {
    const posts = await Posts.retrieve();
    return <PostList posts={posts} />;
  } catch (error) {
    return <p>Unable to fetch posts.</p>;
  }
}

export default Coroutine.create(PostListCo);
```

### Dependency Injection

For the sake of testability you might want to inject instances into your coroutine in the way how React `props` are provided.

You are able to provide `getVariables()` function that receives `props` and `context` and returns an object that will be passed in a coroutine.

```javascript
function getVariables(props) {
  return {
    userPosts: new PostsDAO(props.userId)
  };
}

async function PostListCo({ userPosts }) {
  try {
    const posts = await userPosts.retrieve();
    return <PostList posts={posts} />;
  } catch (error) {
    return <p>Unable to fetch posts.</p>;
  }
}

export default Coroutine.create(PostListCo, getVariables);
```

In the example above, the result component receives `userId` property and uses it to provide a loader to the coroutine.

```html
<PostListCo userId={...} />
```

### Async Iterators

[Asynchronous Iterators](https://github.com/tc39/proposal-async-iteration) are in [Stage 3](https://github.com/tc39/proposals) and soon will be added to the language. However, you might want to try them right now, using [Babel](https://babeljs.io/) or [async-to-gen](https://github.com/leebyron/async-to-gen).

You can use async iterators for providing more than one step of rendering. For example, it can be loading spinner that is rendered immediately and once data is fetched, necessary component replaces the spinner.

```javascript
async function* SearchResultsContainer({ query }) {
  yield <LoadingSpinner />;

  try {
    const results = await SearchDAO.retrieve(query);
    return <SearchResults results={results} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}

export default Coroutine.create(SearchResultsContainer);
```

Also, you might have a component that needs a data from different sources but can be rendered progressively.

```javascript
async function* List() {
  try {
    const items = await Items.retrieve();
    yield <ItemList items={items} />;
    const additionalInfo = await Info.retrieve();
    return <ItemList items={items} info={info} />;
  } catch (error) {
    return <p>...</p>;
  }
}

export default Coroutine.create(List);
```

Async iterators allow you to yield new UI pieces over the time, without the need to re-render a component by parent element.

```javascript
async function* EventStreamContainer() {
  for await (const message of dispatcher) {
    yield <p>Last message {message.type}</p>;
  }
}

export default Coroutine.create(EventStreamContainer);
```

## Testing

Please read the [testing guide](./Testing.md).
