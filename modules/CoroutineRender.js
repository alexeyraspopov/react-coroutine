import { Component } from 'react';
import shallowCompare from 'react/lib/shallowCompare';

export default class AsyncComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { body: null,
                   variables: props.variables || {} };
    this.iterator = null;
    this.forceUpdateHelper = this.forceUpdate.bind(this);
    this.isComponentMounted = false;
    this.asyncFunction = props.co;
  }

  forceUpdate(variables = this.state.variables, props = this.props) {
    const additionalProps = { forceUpdate: this.forceUpdateHelper };
    const asyncBody = this.asyncFunction(Object.assign(additionalProps, variables, props));

    this.iterator = asyncBody;

    if (typeof asyncBody.then === 'function') {
      asyncBody.then(body => {
        if (this.isComponentMounted && this.iterator === asyncBody) {
          this.setState(() => ({ body, variables }));
        }
      });
    } else {
      const getNextBody = () => {
        this.iterator.next().then((body) => {
          if (!this.isComponentMounted || this.iterator !== asyncBody) {
            return;
          }

          if (body.value !== undefined) {
            this.setState(() => ({ body: body.value, variables }));
          }

          return !body.done && getNextBody();
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
      if (this.iterator && this.iterator.return) {
        this.iterator.return();
      }

      if (this.isComponentMounted) {
        this.forceUpdate(this.state.variables, nextProps);
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
    return this.state.body;
  }
}
