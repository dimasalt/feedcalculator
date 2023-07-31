'use client';

import { configureStore } from "@reduxjs/toolkit";
import { selectedFeedsApi } from "../service/selectedFeedsApi";
import  errorMessage from "../features/errorMessage";


// configuring store
export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [selectedFeedsApi.reducerPath]: selectedFeedsApi.reducer,
        message: errorMessage
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(selectedFeedsApi.middleware)
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

