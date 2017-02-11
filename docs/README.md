Small library which leverages the power of modern JavaScript to provide seamless way in creating stateful components with different purposes.

> **Coroutines** are computer program components that generalize subroutines for nonpreemptive multitasking, by allowing multiple entry points for suspending and resuming execution at certain locations. Coroutines are well-suited for implementing more familiar program components such as cooperative tasks, exceptions, event loop, iterators, infinite lists and pipes.  
> — _[Wikipedia](https://en.wikipedia.org/wiki/Coroutine)_

## Why

In the world full of APIs, we starting to forget the power of plain JavaScript and how essential patterns eliminate the need in providing new abstractions.

The power of coroutines allows to write code in synchronous style and be able to pause it or partially postpone its execution. This essential idea brought us [Async Functions](https://github.com/tc39/ecmascript-asyncawait) which are already included in the language. Async functions allow us to get rid of complex Promises API and use plain JavaScript instructions.

```javascript
async function doSomethingComplex(data) {
  try {
    const response = await postData(data);
    const status = await getStatus(response.headers.Location);
    return status;
  } catch (error) {
    notify('Unable to perform the action', error);
  }
}
```

Since React allows as to treat the UI as a first-class citizen, we can mix both things for the sake of solving problems that are the same in React and in just JavaScript code.

This project tends to use the simplicity of functional React components and the essential mechanism of coroutines to create stateful components with data fetching colocation.

The problem of existent solutions in colocating data fetching is an initial complexity of their APIs. These APIs usually tend to provide convenient way for handling one particular use case. This often means possible future issues with handling exceptions or dealing with pending state. However, that's something that can be easily described in terms of the language and may be different based on your opinion or particular task.

## Install

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

## Testing

Please read the [testing guide](./Testing.md).
