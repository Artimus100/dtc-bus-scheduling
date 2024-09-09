// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import routeReducer from './features/routeSlice';

const store = configureStore({
  reducer: {
    routes: routeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
