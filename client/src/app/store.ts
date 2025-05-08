import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/features/auth/authApi'
import authReducer from '@/features/auth/authSlice'
import { tokenApi } from '@/features/token/tokenApi'
import { setupListeners } from '@reduxjs/toolkit/query'
// ...

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      tokenApi.middleware
    ),
})

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch