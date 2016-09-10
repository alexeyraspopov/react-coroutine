import React from 'react';
import Renderer from 'react-test-renderer';
import Coroutine from '../src/Coroutine';

describe('Coroutine', async () => {
  it('should render empty body until coroutine is resolved', async () => {
    const TestComponent = Coroutine.create(async () => <p>test</p>);
    const tree = Renderer.create(<TestComponent />);
    const initial = Renderer.create(<noscript />);
    const success = Renderer.create(<p>test</p>);

    expect(tree.toJSON()).toEqual(initial.toJSON());
    await true;
    expect(tree.toJSON()).toEqual(success.toJSON());
  });
});
