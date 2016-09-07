# react-coroutine

React Components as Coroutines.

```jsx
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
