import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { quotesApi } from './api/quotesApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, quotesApi.middleware),
});

setupListeners(store.dispatch);
