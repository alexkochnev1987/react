import { ThemeProvider } from './providers/ThemeProvider';
import { Provider } from 'react-redux';
import './styles/index.scss';
import '../lib/firebase/firebase.lib';
import { store } from '../store/store';
import React from 'react';
import { AppRouter } from './providers/RouterProvider';
import { ErrorBoundary } from './providers/ErrorBoundary/ErrorBoundary';
import { FallbackComponent } from './providers/ErrorBoundary/FallbackComponent';

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary fallback={FallbackComponent}>
        <Provider store={store}>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
