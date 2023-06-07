import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api'
import matchesReducer from './reducer'
 

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    [api.reducerPath]: api.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch