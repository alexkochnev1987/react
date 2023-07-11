import { ThemeProviderComponent } from './theme/ThemeProviderComponent';
import { MyRouterProvider } from './router/router-provider';
import { Provider } from 'react-redux';
import './index.css';
import './firebase';
import { store } from './store/store';
import React from 'react';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProviderComponent>
          <MyRouterProvider />
        </ThemeProviderComponent>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
