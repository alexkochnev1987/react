import { Layout } from './components/layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/Error-page';
import { Login } from './pages/Login';
import { Users } from './components/users/users';
import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MobxStore from './store/mob-x/store';
import { Registration } from './pages/Registration';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC4UE2w0EbmTIeo7mu4k8QsdYDfxehi8t8',
  authDomain: 'coach-planner.firebaseapp.com',
  projectId: 'coach-planner',
  storageBucket: 'coach-planner.appspot.com',
  messagingSenderId: '453833960134',
  appId: '1:453833960134:web:61e09c9f132ce6b43885c7',
  measurementId: 'G-X0BKFHKKD3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

interface Store {
  store: MobxStore;
}

const mobxStore = new MobxStore();

export const Context = createContext<Store>({ store: mobxStore });

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Context.Provider value={{ store: mobxStore }}>
          <RouterProvider router={router} />
        </Context.Provider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
