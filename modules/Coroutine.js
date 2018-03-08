import { Component } from 'react';

export default { create };

function create(asyncFn) {
  class Coroutine extends Component {
    constructor(props) {
      super(props);
      this.state = { data: null };
      this.iterator = null;
      this.isComponentMounted = false;
    }

    forceUpdate(props) {
      let asyncBody = asyncFn(props);

      this.iterator = asyncBody;

      let updater = data => {
        if (this.isComponentMounted && this.iterator === asyncBody) {
          this.setState({ data });
        }
      };

      if (isPromiseLike(asyncBody)) {
        // asyncFn is Async Function, awaiting for the final result
        return asyncBody.then(updater);
      } else {
        let step = this.iterator.next();

        if (isPromiseLike(step)) {
          // asyncFn is Async Generator, rendering every time it yields
          return resolveAsyncIterator(this.iterator, step, updater);
        } else {
          // asyncFn is Sync Generator, rendering the final result, awaiting yielded promises
          return resolveSyncIterator(this.iterator, step, updater);
        }
      }
    }

    componentDidMount() {
      this.isComponentMounted = true;
      return this.forceUpdate(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props, nextProps)) {
        if (this.iterator && this.iterator.return) {
          this.iterator.return();
        }

        if (this.isComponentMounted) {
          this.forceUpdate(nextProps);
        }
      }
    }

    componentWillUnmount() {
      if (this.iterator && this.iterator.return) {
        this.iterator.return();
      }

      this.isComponentMounted = false;
    }

    render() {
      return this.state.data;
    }
  }

  Coroutine.displayName = asyncFn.name || asyncFn.displayName || 'Anonymous';

  return Coroutine;
}

function resolveSyncIterator(i, step, cb) {
  if (!step.done) {
    if (isPromiseLike(step.value)) {
      return step.value.then(data => resolveSyncIterator(i, i.next(data), cb));
    } else {
      return resolveSyncIterator(i, i.next(step.value), cb);
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
