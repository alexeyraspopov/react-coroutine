import React, { Component } from 'react';

export default class AsyncComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { body: React.createElement('noscript'),
                   variables: props.variables || {} };
    this.iterator = null;
    this.forceUpdateHelper = this.forceUpdate.bind(this);
    this.isComponentMounted = false;
  }

  forceUpdate(variables = this.state.variables, props = this.props) {
    const additionalProps = { forceUpdate: this.forceUpdateHelper };
    const asyncBody = props.co(Object.assign(additionalProps, variables, props));

    if (asyncBody instanceof Promise) {
      asyncBody.then(body => {
        this.setState(() => ({ body, variables }));
      });
    } else {
      this.iterator = asyncBody;
      const getNextBody = () => {
        asyncBody.next().then((body) => {
          if (body.done && typeof body.value === 'undefined') {
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
    this.isComponentMounted = true;
    return this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, nextProps)) {
      if (this.iterator) {
        this.iterator.return();
        this.iterator = null;
      }

      if (this.isComponentMounted) {
        this.forceUpdate(this.state.variables, nextProps);
      }
    }
  }

  componentWillUnmount() {
    if (this.iterator) {
      this.iterator.return();
      this.iterator = null;
    }

    this.isComponentMounted = false;
  }

  render() {
    return this.state.body;
  }
}
