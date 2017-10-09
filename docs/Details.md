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

## How it works: async functions

When an async component is mounted, async function is executed. Initially, mounted component will render nothing, since async function hasn't been resolved or rejected yet. You can set your `placeholder` for the pending state, check Dependency Injection docs below. Once async function is resolved, the thing it returned will be rendered instead of placeholder. Whenever you pass new props to an async component it will switch to pending state and execute async function again.

## How it works: async generators

In the same way as async functions work, async generators are executed when a component is mounted. In addition, you can produce content more than once by using `yield` keyword. You can find a good example of `yield` keyword usage on [examples page](/Examples.html).

    async function* MultipleStepsRender() {
      yield <p>Loading...</p>;

      const firstPart = await fetchSomeData();
      yield <DataList first={firstPart} />;

      const secondPart = await fetchMoreData();
      return <DataList first={firstPart} second={secondPart} />;
    }

Worth mentioning, `for..await` also can be used for producing content over time.

    async function* EventMonitor({ stream }) {
      for await (const event of stream)
        yield <EventInfo event={event} />;
    }

## Using context

React Context is [accessible](https://facebook.github.io/react/docs/context.html#referencing-context-in-stateless-functional-components) in the same way as for stateless functional components:

    async function* SomeCoroutine(props, context) {
      for await (const message of context.dispatcher)
        yield <SomeContent message={message} {...props} >;
    }

    SomeCoroutine.contextTypes = {
      dispatcher: () => null
    };
