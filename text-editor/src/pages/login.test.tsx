import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { Login } from './Login';

import React, { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

describe('test login component', () => {
  it('increment', async () => {
    const { getByTestId } = renderWithProviders(<Login />, {
      preloadedState: { counter: { value: 10 } },
    });
    screen.debug();
    const incrementButton = getByTestId('increment');
    const decrementButton = getByTestId('decrement');
    expect(getByTestId('value-title')).toHaveTextContent('10');
    await userEvent.click(incrementButton);
    expect(getByTestId('value-title')).toHaveTextContent('11');
    await userEvent.click(decrementButton);
    expect(getByTestId('value-title')).toHaveTextContent('10');
  });
});

import type { AppStore, RootState } from '../store/store';
import { counter } from '../store/counter-slice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      counter: { value: 0 },
    },
    store = configureStore({ reducer: { counter: counter }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
