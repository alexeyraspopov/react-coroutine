import React from 'react';
import Renderer from 'react-test-renderer';
import Coroutine from '../Coroutine';

describe('Coroutine', () => {
  it('should render empty body until coroutine is resolved', async () => {
    async function render() {
      return <p>test</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = Renderer.create(<TestComponent />);

    expect(tree.toJSON()).toEqual(null);

    let success = await Renderer.create(<p>test</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });

  it('should render each step of async iterator', async () => {
    async function* render() {
      yield <p>Loading...</p>;
      await Promise.resolve();
      return <p>Done!</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = await Renderer.create(<TestComponent />);

    let first = await Renderer.create(<p>Loading...</p>);
    expect(tree.toJSON()).toEqual(first.toJSON());

    let second = await Renderer.create(<p>Done!</p>);
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
      let b = yield a + a;
      return <p>{a}, {b}</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = Renderer.create(<TestComponent />);

    let result = await Renderer.create(<p>{1}, {2}</p>);
    expect(tree.toJSON()).toEqual(result.toJSON());
  });

  it('should rethrow exceptions back to generator in async mode', () => {
    function* render() {
      try {
        yield new Error('Boom');
      } catch (error) {
        return <p>{error.message}</p>;
      }
    }

    let TestComponent = Coroutine.create(render);
    let tree = Renderer.create(<TestComponent />);

    let result = Renderer.create(<p>Boom</p>);
    expect(tree.toJSON()).toEqual(result.toJSON());
  });

  it('should rethrow exceptions back to generator in async mode', async () => {
    function* render() {
      try {
        yield Promise.reject(new Error('Boom'));
      } catch (error) {
        return <p>{error.message}</p>;
      }
    }

    let TestComponent = Coroutine.create(render);
    let tree = await Renderer.create(<TestComponent />);

    let result = await Renderer.create(<p>Boom</p>);
    expect(tree.toJSON()).toEqual(result.toJSON());
  });

  it('should rethrow exceptions back to async generator', async () => {
    async function* render() {
      try {
        await Promise.reject(new Error('Boom'));
        return <p>Hello</p>;
      } catch (error) {
        return <p>{error.message}</p>;
      }
    }

    let TestComponent = Coroutine.create(render);
    let tree = await Renderer.create(<TestComponent />);

    let result = await Renderer.create(<p>Boom</p>);
    expect(tree.toJSON()).toEqual(result.toJSON());
  });

  it('should restart coroutine on new props', async () => {
    let getData = jest.fn(n => Promise.resolve(n * 2));
    let trap = jest.fn();

    async function* render({ number }) {
      let data = await getData(number);
      yield <p>{data}</p>;
      await Promise.resolve();
      yield <p>Another</p>;
      trap();
      return <p>Done</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = await Renderer.create(<TestComponent number={13} />);

    let first = await Renderer.create(<p>26</p>);
    expect(tree.toJSON()).toEqual(first.toJSON());
    expect(getData).toHaveBeenCalledWith(13);

    await tree.update(<TestComponent number={20} />);

    let second = await Renderer.create(<p>40</p>);
    expect(tree.toJSON()).toEqual(second.toJSON());
    expect(getData).toHaveBeenCalledWith(20);
    expect(trap).not.toHaveBeenCalled();
  });

  it('should do nothing about the same props', async () => {
    let trap = jest.fn();

    async function render({ number }) {
      trap();
      return <p>Test</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = await Renderer.create(<TestComponent number={13} />);

    tree.update(<TestComponent number={13} />);

    expect(trap).toHaveBeenCalledTimes(1);
  });

  it('should cancel async iterator on unmount', async () => {
    let getData = jest.fn(n => Promise.resolve(n * 2));
    let trap = jest.fn();

    async function* render({ number }) {
      let data = await getData(number);
      yield <p>{data}</p>;
      await Promise.resolve();
      yield <p>Another {trap()}</p>;
      return <p>Done</p>;
    }

    let TestComponent = Coroutine.create(render);
    let tree = await Renderer.create(<TestComponent number={13} />);

    let first = await Renderer.create(<p>26</p>);
    expect(tree.toJSON()).toEqual(first.toJSON());
    expect(getData).toHaveBeenCalledWith(13);

    tree.unmount();
    expect(trap).not.toHaveBeenCalled();
  });
});
