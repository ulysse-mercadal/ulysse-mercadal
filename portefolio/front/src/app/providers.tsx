'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers'; // Adjust path as needed

// Create the store outside of the component to avoid recreating it on every render
const store = createStore(reducer);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
