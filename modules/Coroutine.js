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

      if (isPromiseLike(target)) {
        // coroutine is Async Function, awaiting for the final result
        return target.then(value => shouldStop() || updateView(value));
      } else {
        let step = this.iterator.next();

        if (isPromiseLike(step)) {
          // coroutine is Async Generator, rendering every time it yields
          return resolveAsyncIterator(this.iterator, step, updateView, shouldStop);
        } else {
          // coroutine is Sync Generator, rendering the final result, awaiting yielded promises
          return resolveSyncIterator(this.iterator, step, updateView, shouldStop);
        }
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

function resolveSyncIterator(i, step, cb, shouldStop) {
  if (shouldStop()) {
    return i.return();
  }
  if (!step.done) {
    if (isPromiseLike(step.value)) {
      return step.value
        .then(data => resolveSyncIterator(i, i.next(data), cb, shouldStop))
        .catch(error => resolveSyncIterator(i, i.throw(error), cb, shouldStop));
    } else {
      let isErrorLike = step.value instanceof Error;
      let nextStep = isErrorLike ? i.throw(step.value) : i.next(step.value);
      return resolveSyncIterator(i, nextStep, cb, shouldStop);
    }
  } else {
    return cb(step.value);
  }
}

function resolveAsyncIterator(i, step, cb, shouldStop) {
  step.then(data => {
    if (shouldStop()) {
      return i.return();
    }

    if (data.value !== undefined) {
      cb(data.value);
    }

    return !data.done && resolveAsyncIterator(i, i.next(), cb, shouldStop);
  });
}

function isPromiseLike(target) {
  return target && typeof target.then === 'function';
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
