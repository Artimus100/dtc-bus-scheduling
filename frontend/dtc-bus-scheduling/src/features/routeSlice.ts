// src/features/routeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RouteState {
  routes: any[];  // Replace `any` with your route type
}

const initialState: RouteState = {
  routes: [],
};

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes(state, action: PayloadAction<any[]>) {
      state.routes = action.payload;
    },
  },
});

export const { setRoutes } = routeSlice.actions;
export default routeSlice.reducer;
