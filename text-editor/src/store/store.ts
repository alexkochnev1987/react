import { counter } from './counter-slice';

import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from '@reduxjs/toolkit';
import { userReducer } from './user-slice';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from './saga/workers/increment-worker';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// Types to cut down on boilerplate across dozens of thunks.

// const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
  counter: counter,
  user: userReducer,
});

// export function setupStore(preloadedState?: PreloadedState<RootState>) {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });
// }
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  //   reducer: {
  //     counter: counter,
  //     user: userReducer,
  //   },
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  preloadedState: {
    counter: { value: 10000, users: [] },
  },
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type Dispatcher = ThunkDispatch<RootState, undefined, AnyAction>;
export type TypedThunk<R = void> = ThunkAction<R, RootState, unknown, Action>;
