import { Component, ErrorInfo, ReactNode, createElement } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback: ({ error }: { error: Error }) => React.JSX.Element;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: null | Error;
}
const initialState = { hasError: false, error: null };

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const error = this.state.error;
      return createElement(this.props.fallback, { error });
    }

    return this.props.children;
  }
}
