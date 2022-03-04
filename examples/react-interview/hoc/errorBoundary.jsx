import { PureComponent } from 'React';

const errorBoundary = (WrappedComponent) => {
  return class Wrap extends PureComponent {
    state = {
      hasError: false,
    };

    static getDerivedStateFromError(err) {
      return {
        hasError: true,
        err,
      };
    }

    componentDidCatch(err, info) {
      // do somethings...
    }

    render() {
      return this.state.hasError ? (
        <div error={this.state.error} />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

export default errorBoundary;
