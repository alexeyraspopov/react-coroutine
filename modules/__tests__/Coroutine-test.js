import React from 'react';
import Renderer from 'react-test-renderer';
import Coroutine from '../Coroutine';

describe('Coroutine', () => {
  it('should render empty body until coroutine is resolved', async () => {
    async function render() {
      return <p>test</p>;
    }

    const TestComponent = Coroutine.create(render);
    const tree = Renderer.create(<TestComponent />);

    expect(tree.toJSON()).toEqual(null);

    const success = await Renderer.create(<p>test</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });

  it('should render each step of async iterator', async () => {
    async function* render() {
      yield <p>Loading...</p>;
      await Promise.resolve();
      return <p>Done!</p>;
    }

    const TestComponent = Coroutine.create(render);
    const tree = await Renderer.create(<TestComponent />);

    const first = await Renderer.create(<p>Loading...</p>);
    expect(tree.toJSON()).toEqual(first.toJSON());

    const second = await Renderer.create(<p>Done!</p>);
    expect(tree.toJSON()).toEqual(second.toJSON());
  });

  it('should render generator in sync mode', () => {
    function* render() {
      let a = yield 1;
      let b = yield 2;
      return <p>{a}, {b}</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = Renderer.create(<TestComponent />);

    let result = Renderer.create(<p>{1}, {2}</p>);
    expect(tree.toJSON()).toEqual(result.toJSON());
  });

  it('should render generator in async mode', async () => {
    function* render() {
      let a = yield Promise.resolve(1);
      let b = yield 2;
      return <p>{a}, {b}</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = Renderer.create(<TestComponent />);

    let result = await Renderer.create(<p>{1}, {2}</p>);
    expect(tree.toJSON()).toEqual(result.toJSON());
  });
});
