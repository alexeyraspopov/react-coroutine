# React Coroutine

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

## Testing

Please read the [testing guide](./Testing.md).
