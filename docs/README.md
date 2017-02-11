# React Coroutine

Small library which leverages the power of modern JavaScript to provide seamless way in creating stateful components with different purposes.

## Why

In the world full of APIs, we starting to forget the power of plain JavaScript and how essential patterns eliminate the need in providing new abstractions.

This project tends to use the simplicity of functional React components and the essential mechanism of coroutines to create stateful components with colocation.


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

## Testing

Please read the [testing guide](./Testing.md).
