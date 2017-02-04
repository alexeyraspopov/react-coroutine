import React from 'react';
import Renderer from 'react-test-renderer';
import Coroutine from '../modules/Coroutine';

describe('Coroutine', async () => {
  it('should render empty body until coroutine is resolved', async () => {
    async function render() {
      return <p>test</p>;
    }

    const TestComponent = Coroutine.create(render);
    const tree = Renderer.create(<TestComponent />);

    const initial = Renderer.create(<noscript />);
    expect(tree.toJSON()).toEqual(initial.toJSON());

    const success = await Renderer.create(<p>test</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });

  it('should pass initial information', async () => {
    function getVariables() {
      return { number: 13 };
    }

    async function render({ number }) {
      return <p>{ number }</p>;
    }

    const TestComponent = Coroutine.create(render, getVariables);
    const tree = Renderer.create(<TestComponent />);

    const success = await Renderer.create(<p>{13}</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });

  it('should re-render the component if variables are updated', async () => {
    function getVariables() {
      return { number: 0 };
    }

    async function render({ number, forceUpdate }) {
      try {
        return <p>{ number }</p>;
      } finally {
        await true;
        if (number === 0) forceUpdate({ number: 1 });
      }
    }

    const TestComponent = Coroutine.create(render, getVariables);
    const tree = await Renderer.create(<TestComponent />);

    const success = await Renderer.create(<p>{0}</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());

    const updated = await Renderer.create(<p>{1}</p>);
    expect(tree.toJSON()).toEqual(updated.toJSON());
  });
});
