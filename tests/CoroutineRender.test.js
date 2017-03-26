import React from 'react';
import Renderer from 'react-test-renderer';
import Coroutine from '../modules/Coroutine';

describe('Coroutine Render', async () => {
  it('should render the coroutine passed as a prop', async () => {
    async function render() {
      return <p>test</p>;
    }

    const tree = Renderer.create(<Coroutine.render co={render} />);

    expect(tree.toJSON()).toEqual(null);

    const success = await Renderer.create(<p>test</p>);
    expect(tree.toJSON()).toEqual(success.toJSON());
  });
});
