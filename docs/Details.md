In the world full of APIs, we starting to forget the power of plain JavaScript and how essential patterns eliminate the need in providing new abstractions.

The power of coroutines allows to write code in synchronous style and be able to pause it or partially postpone its execution. This essential idea brought us [Async Functions](https://github.com/tc39/ecmascript-asyncawait) which are already included in the language. Async functions allow us to get rid of complex Promises API and use plain JavaScript instructions.

    async function doSomethingComplex(data) {
      try {
        const response = await postData(data);
        const status = await getStatus(response.headers.Location);
        return status;
      } catch (error) {
        notify('Unable to perform the action', error);
      }
    }

Since React allows us to treat the UI as a first-class citizen, we can mix both things for the sake of solving problems that are the same for React and for just JavaScript code.

This project tends to use the simplicity of functional React components and the essential mechanism of coroutines to create stateful components with data fetching colocation.

The problem of existent solutions in colocating data fetching is an initial complexity of their APIs. These APIs usually tend to provide convenient way for handling one particular use case. This often means possible future issues with handling exceptions or dealing with pending state. However, that's something that can be easily described in terms of the language and may be different based on your opinion or particular task.

## Dependency injection

For the sake of code isolation you might want to inject instances into your coroutine in the way how React `props` are provided.

You are able to provide `getVariables()` function that receives `props` and `context` and returns an object that will be passed in a coroutine.

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

In the example above, the result component receives `userId` property and uses it to provide a loader to the coroutine.

    <PostListCo userId={...} />
