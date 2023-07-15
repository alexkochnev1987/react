import { ThemeProvider } from './providers/ThemeProvider';
import { Provider } from 'react-redux';
import './styles/index.scss';
import '../firebase';
import { store } from '../store/store';
import React from 'react';
import { AppRouter } from './providers/RouterProvider';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
