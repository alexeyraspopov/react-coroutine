import React, { Component } from 'react';
import isEqual from 'react/lib/shallowCompare';
import invariant from 'invariant';

function create(asyncFn) {
  const componentName = asyncFn.name || asyncFn.displayName;

  class AsyncComponent extends Component {
    static get displayName() {
      return `Async(${componentName})`;
    }

    constructor(props) {
      super(props);
      this.state = { body: React.createElement('noscript') };
      this.forceUpdateHelper = this.forceUpdate.bind(this);
    }

    forceUpdate() {
      const additionalProps = { forceUpdate: this.forceUpdateHelper };
      const asyncBody = asyncFn(Object.assign(additionalProps, this.props));

      invariant(asyncBody instanceof Promise,
                `${componentName} should return a Promise`);

      return asyncBody
        .then(body => this.setState(() => ({ body })))
        .catch(error => throw error);
    }

    componentDidMount() {
      return this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
      return isEqual(nextProps, this.props) && this.forceUpdate();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
      return this.state.body;
    }
  }

  return AsyncComponent;
}

export default { create };
