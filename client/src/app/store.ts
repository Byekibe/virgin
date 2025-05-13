import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/features/auth/authApi'
import authReducer from '@/features/auth/authSlice'
import { tokenApi } from '@/features/token/tokenApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import {roleApi} from "@/features/roles/rolesApi"
import {userApi} from "@/features/users/userApi"
import { permissionApi } from "@/features/permissions/permissions"
import { userRoleApi } from "@/features/userRoles/userRolesApi"
import { rolePermissionApi } from '@/features/rolePermissions/rolePermissionsApi'
// ...

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userRoleApi.reducerPath]: userRoleApi.reducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
    [rolePermissionApi.reducerPath]: rolePermissionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      tokenApi.middleware,
      roleApi.middleware,
      userApi.middleware,
      permissionApi.middleware,
      userRoleApi.middleware,
      rolePermissionApi.middleware
    ),
})

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch