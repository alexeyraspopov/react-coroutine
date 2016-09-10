import React from 'react';
import Renderer from 'react-test-renderer';
import Coroutine from '../src/Coroutine';

describe('Coroutine', async () => {
  it('should render empty body until coroutine is resolved', async () => {
    const render = async () => <p>test</p>;
    const TestComponent = Coroutine.create(render);
    const tree = Renderer.create(<TestComponent />);

    const initial = Renderer.create(<noscript />);
    expect(tree.toJSON()).toEqual(initial.toJSON());

    const success = await Renderer.create(<p>test</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });

  it('should pass initial information', async () => {
    const render = async ({ number }) => <p>{ number }</p>;
    const variables = () => ({ number: 13 });
    const TestComponent = Coroutine.create(render, variables);
    const tree = Renderer.create(<TestComponent />);

    const success = await Renderer.create(<p>{13}</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });
});
