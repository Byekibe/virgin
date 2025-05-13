import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/utils';
import { ApiResponse } from '@/types/authTypes';
import { AssignRoleRequest, UserRole } from '@/types/userRoles';


// Define UserRole type based on your backend model


export const userRoleApi = createApi({
  reducerPath: 'userRoleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['UserRole', 'User', 'Role'],
  endpoints: (builder) => ({
    // Get all user-role assignments
    getUserRoles: builder.query<UserRole[], void>({
      query: () => '/user-roles',
      transformResponse: (response: ApiResponse<UserRole[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'UserRole' as const, id })),
              { type: 'UserRole', id: 'LIST' },
            ]
          : [{ type: 'UserRole', id: 'LIST' }],
    }),
    
    // Assign a role to a user
    assignRole: builder.mutation<UserRole, AssignRoleRequest>({
      query: (assignData) => ({
        url: '/user-roles',
        method: 'POST',
        body: assignData,
      }),
      transformResponse: (response: ApiResponse<UserRole>) => response.data!,
      invalidatesTags: [
        { type: 'UserRole', id: 'LIST' },
        { type: 'User', id: 'LIST' },
        { type: 'Role', id: 'LIST' }
      ],
    }),
    
    // Remove a role from a user
    removeRole: builder.mutation<void, { user_id: number; role_id: number }>({
      query: ({ user_id, role_id }) => ({
        url: `/user-roles?user_id=${user_id}&role_id=${role_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'UserRole', id: 'LIST' },
        { type: 'User', id: 'LIST' },
        { type: 'Role', id: 'LIST' }
      ],
    }),
    
    // Get roles for a specific user
    getUserRolesByUserId: builder.query<UserRole[], number>({
      query: (userId) => `/user-roles?user_id=${userId}`,
      transformResponse: (response: ApiResponse<UserRole[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'UserRole' as const, id })),
              { type: 'UserRole', id: 'LIST' },
            ]
          : [{ type: 'UserRole', id: 'LIST' }],
    }),
    
    // Get users for a specific role
    getUsersByRoleId: builder.query<UserRole[], number>({
      query: (roleId) => `/user-roles?role_id=${roleId}`,
      transformResponse: (response: ApiResponse<UserRole[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'UserRole' as const, id })),
              { type: 'UserRole', id: 'LIST' },
            ]
          : [{ type: 'UserRole', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserRolesQuery,
  useAssignRoleMutation,
  useRemoveRoleMutation,
  useGetUserRolesByUserIdQuery,
  useGetUsersByRoleIdQuery,
} = userRoleApi;