import AsyncComponent from './CoroutineRender';

export default function create(asyncFn, getVariables = () => ({})) {
  const componentName = asyncFn.name || asyncFn.displayName;

  return class CoroutineComponent extends AsyncComponent {
    static get displayName() {
      return `Coroutine(${componentName})`;
    }

    static get contextTypes() {
      return asyncFn.contextTypes;
    }

    constructor(props, context) {
      super(props, context);
      const variables = getVariables(props, context);
      const body = variables.placeholder || this.state.body;
      this.state = { body, variables };
      this.asyncFunction = asyncFn;
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const variables = getVariables(nextProps, nextContext);
      this.setState(() => { variables }, () => super.componentWillReceiveProps(nextProps));
    }
  }
}
