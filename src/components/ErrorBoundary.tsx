import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    //called when an error is thrown during rendering
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 shadow-md rounded-md max-w-md">
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong!</h2>
                        <p className="text-gray-700">
                            An unexpected error occurred. Please refresh the page or try again later.
                        </p>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
