import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import {deezerApi} from'./services/deezerApi';

export const store = configureStore({
  reducer: {
     [deezerApi.reducerPath]:deezerApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(deezerApi.middleware)
});
