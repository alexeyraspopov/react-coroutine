import { Component } from 'react';
import isEqual from 'shallowequal';

export default class Coroutine extends Component {
  static create(asyncFn) {
    return class AsyncComponent extends Coroutine {
      static get contextTypes() {
        return asyncFn.contextTypes;
      }

      static get displayName() {
        return `Coroutine(${asyncFn.name})`;
      }

      observe() {
        return asyncFn(this.props, this.context);
      }

      render() {
        return this.state.data;
      }
    }
  }

  static get displayName() {
    return `Coroutine(${this.name})`;
  }

  constructor(props, context) {
    super(props, context);
    this.state = { data: null };
    this.iterator = null;
    this.forceUpdateHelper = this.forceUpdate.bind(this);
    this.isComponentMounted = false;
  }

  observe() {
    throw new Error('Coroutine::observe should be implemented by a subclass');
  }

  forceUpdate(props) {
    const asyncBody = this.observe();

    this.iterator = asyncBody;

    if (typeof asyncBody.then === 'function') {
      asyncBody.then(data => {
        if (this.isComponentMounted && this.iterator === asyncBody) {
          this.setState(() => ({ data }));
        }
      });
    } else {
      const getNextBody = () => {
        this.iterator.next().then((data) => {
          if (!this.isComponentMounted || this.iterator !== asyncBody) {
            return;
          }

          if (data.value !== undefined) {
            this.setState(() => ({ data: data.value }));
          }

          return !data.done && getNextBody();
        });
      };

      getNextBody();
    }
  }

  componentDidMount() {
    this.isComponentMounted = true;
    return this.forceUpdate(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
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
    throw new Error('Coroutine::render should be implemented by a subclass');
  }
}
