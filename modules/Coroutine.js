import React, { Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';

function create(asyncFn, getVariables = () => ({})) {
  const componentName = asyncFn.name || asyncFn.displayName;

  return class AsyncComponent extends Component {
    static get displayName() {
      return `Coroutine(${componentName})`;
    }

    constructor(props, context) {
      super(props, context);
      this.state = { body: React.createElement('noscript'),
                     variables: getVariables(props, context) };
      this.iterator = null;
      this.forceUpdateHelper = this.forceUpdate.bind(this);
    }

    forceUpdate(variables = this.state.variables) {
      const additionalProps = { forceUpdate: this.forceUpdateHelper };
      const asyncBody = asyncFn(Object.assign(additionalProps, variables, this.props));

      if (asyncBody instanceof Promise) {
        asyncBody.then(body => {
          this.setState(() => ({ body, variables }));
        });
      } else {
        this.iterator = asyncBody;
        const getNextBody = () => {
          asyncBody.next().then((body) => {
            if (body.done) {
              this.iterator = null;
            } else {
              this.setState(() => ({ body: body.value, variables }));
              return getNextBody();
            }
          });
        };

        getNextBody();
      }
    }

    componentDidMount() {
      return this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
      if (shallowCompare(this, nextProps)) {
        if (this.iterator) {
          this.iterator.return();
          this.iterator = null;
        }

        this.forceUpdate();
      }
    }

    componentWillUnmount() {
      if (this.iterator) {
        this.iterator.return();
        this.iterator = null;
      }
    }

    render() {
      return this.state.body;
    }
  }
}

export default { create };
