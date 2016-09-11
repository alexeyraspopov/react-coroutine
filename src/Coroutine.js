import React, { Component } from 'react';
import isEqual from 'react/lib/shallowCompare';
import invariant from 'invariant';

function create(asyncFn, defaultVariables = () => ({})) {
  const componentName = asyncFn.name || asyncFn.displayName;

  return class AsyncComponent extends Component {
    static get displayName() {
      return `Coroutine(${componentName})`;
    }

    constructor(props) {
      super(props);
      this.state = { body: React.createElement('noscript'),
                     variables: defaultVariables() };
      this.forceUpdateHelper = this.forceUpdate.bind(this);
    }

    forceUpdate(variables = this.state.variables) {
      const additionalProps = { forceUpdate: this.forceUpdateHelper };
      const asyncBody = asyncFn(Object.assign(additionalProps, variables, this.props));

      invariant(asyncBody instanceof Promise || asyncBody[Symbol.iterator]() === asyncBody,
                `${componentName} should return a Promise or Iterator`);

      return asyncBody
        .then(body => this.setState(() => ({ body, variables })))
        .catch(error => { throw error });
    }

    componentDidMount() {
      return this.forceUpdate(this.state.variables);
    }

    componentWillReceiveProps(nextProps) {
      return !isEqual(nextProps, this.props) && this.forceUpdate();
    }

    render() {
      return this.state.body;
    }
  }
}

export default { create };
