import { Component } from 'react';

export default { create };

function create(coroutine) {
  class Coroutine extends Component {
    constructor(props) {
      super(props);
      this.state = { view: null };
      this.iterator = null;
      this.mounted = false;
    }

    forceUpdate(props) {
      let target = coroutine(props);

      this.iterator = target;

      let updater = view => {
        if (this.mounted && this.iterator === target) {
          this.setState({ view });
        }
      };

      if (isPromiseLike(target)) {
        // coroutine is Async Function, awaiting for the final result
        return target.then(updater);
      } else {
        let step = this.iterator.next();

        if (isPromiseLike(step)) {
          // coroutine is Async Generator, rendering every time it yields
          return resolveAsyncIterator(this.iterator, step, updater);
        } else {
          // coroutine is Sync Generator, rendering the final result, awaiting yielded promises
          return resolveSyncIterator(this.iterator, step, updater);
        }
      }
    }

    componentDidMount() {
      this.mounted = true;
      return this.forceUpdate(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props, nextProps)) {
        if (this.iterator && this.iterator.return) {
          this.iterator.return();
        }

        if (this.mounted) {
          this.forceUpdate(nextProps);
        }
      }
    }

    componentWillUnmount() {
      if (this.iterator && this.iterator.return) {
        this.iterator.return();
      }

      this.mounted = false;
    }

    render() {
      return this.state.view;
    }
  }

  Coroutine.displayName = coroutine.name || coroutine.displayName || 'Anonymous';

  return Coroutine;
}

function resolveSyncIterator(i, step, cb) {
  if (!step.done) {
    if (isPromiseLike(step.value)) {
      return step.value
        .then(data => resolveSyncIterator(i, i.next(data), cb))
        .catch(error => resolveSyncIterator(i, i.throw(error), cb));
    } else {
      let isErrorLike = step.value instanceof Error;
      let nextStep = isErrorLike ? i.throw(step.value) : i.next(step.value);
      return resolveSyncIterator(i, nextStep, cb);
    }
  } else {
    return cb(step.value);
  }
}

function resolveAsyncIterator(i, step, cb) {
  step.then(data => {
    if (data.value !== undefined) {
      cb(data.value);
    }

    return !data.done && resolveAsyncIterator(i, i.next(), cb);
  });
}

function isPromiseLike(target) {
  return target && typeof target.then === 'function';
}

function isEqual(a, b) {
  return a === b || keysEqual(a, b) || keysEqual(b, a);
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
