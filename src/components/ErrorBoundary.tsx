import React from 'react';

const serializeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack;
  }
  return JSON.stringify(error, null, 2);
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-red-500 rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-red-400 text-2xl font-bold mb-4">Algo salió mal</h2>
            <p className="text-gray-300 mb-4">
              Ha ocurrido un error inesperado. Por favor, recarga la página o contacta al soporte técnico.
            </p>
            <details className="mt-4">
              <summary className="text-yellow-400 cursor-pointer">Detalles técnicos</summary>
              <pre className="mt-2 text-sm text-gray-400 bg-black p-4 rounded overflow-auto">
                {serializeError(this.state.error)}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;