import { PureComponent } from 'react';

export default { create };

function create(coroutine) {
  class Coroutine extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { view: null };
      this.iterator = null;
    }

    iterate(props) {
      let target = coroutine(props);

      this.iterator = target;

      let shouldStop = () => this.iterator !== target;
      let updateView = view => this.setState({ view });

      if (target && typeof target.then === 'function') {
        // coroutine is Async Function, awaiting for the final result
        return target.then(value => shouldStop() || updateView(value));
      } else {
        // coroutine is Async Generator, rendering every time it yields
        return resolveAsyncIterator(this.iterator, updateView, shouldStop);
      }
    }

    componentDidMount() {
      return this.iterate(this.props);
    }

    componentDidUpdate(prevProps) {
      return arePropsEqual(this.props, prevProps) || this.iterate(this.props);
    }

    componentWillUnmount() {
      this.iterator = null;
    }

    render() {
      return this.state.view;
    }
  }

  Coroutine.displayName = coroutine.name || coroutine.displayName || 'Anonymous';

  return Coroutine;
}

function resolveAsyncIterator(iterator, done, shouldStop) {
  return iterator.next().then(data => {
    if (shouldStop()) {
      return iterator.return();
    }

    if (data.value !== undefined) {
      done(data.value);
    }

    return !data.done && resolveAsyncIterator(iterator, done, shouldStop);
  });
}

function arePropsEqual(a, b) {
  return keysEqual(a, b) || keysEqual(b, a);
}

function keysEqual(a, b) {
  for (let k in a) {
    if (a.hasOwnProperty(k)) {
      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
        return false;
      }
    }
  }

  return true;
}
