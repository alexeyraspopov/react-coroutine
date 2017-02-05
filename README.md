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

Inject variables to a coroutine:

```javascript
function getVariables(props) {
  return {
    posts: new PostsDAO(props.userId),
  };
}

async function PostListContainer({ posts }) {
  try {
    return <PostList posts={await posts.retrieve()} />
  } catch (error) {
    return <ErrorMessage error={error} />
  }
}

export default Coroutine.create(PostListCo, getVariables);
```

And use it as a component:

```javascript
<PostListContainer userId={...} />
```

Async generators as components:

```javascript
async function* CommentListContainer() {
  yield <LoadingSpinner />;

  try {
    const comments = await CommentsDAO.retrieve();
    return <CommentList comments={comments} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}

export default Coroutine.create(CommentListContainer);
```

```javascript
async function* EventStreamContainer() {
  for await (const message of dispatcher) {
    yield <p>Last message {message.type}</p>;
  }
}

export default Coroutine.create(EventStreamContainer);
```

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
