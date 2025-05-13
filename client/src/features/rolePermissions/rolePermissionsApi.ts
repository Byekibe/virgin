import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/utils';
import { ApiResponse } from '@/types/authTypes';
import { AssignPermissionRequest, RolePermission } from '@/types/rolePermissionsTypes';

export const rolePermissionApi = createApi({
  reducerPath: 'rolePermissionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['RolePermission', 'Role', 'Permission'],
  endpoints: (builder) => ({
    // Get all role-permission assignments
    getRolePermissions: builder.query<RolePermission[], void>({
      query: () => '/role-permissions',
      transformResponse: (response: ApiResponse<RolePermission[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'RolePermission' as const, id })),
              { type: 'RolePermission', id: 'LIST' },
            ]
          : [{ type: 'RolePermission', id: 'LIST' }],
    }),
    
    // Assign a permission to a role
    assignPermission: builder.mutation<RolePermission, AssignPermissionRequest>({
      query: (assignData) => ({
        url: '/role-permissions',
        method: 'POST',
        body: assignData,
      }),
      transformResponse: (response: ApiResponse<RolePermission>) => response.data!,
      invalidatesTags: [
        { type: 'RolePermission', id: 'LIST' },
        { type: 'Role', id: 'LIST' },
        { type: 'Permission', id: 'LIST' }
      ],
    }),
    
    // Remove a permission from a role
    removePermission: builder.mutation<void, { role_id: number; permission_id: number }>({
      query: ({ role_id, permission_id }) => ({
        url: `/role-permissions?role_id=${role_id}&permission_id=${permission_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'RolePermission', id: 'LIST' },
        { type: 'Role', id: 'LIST' },
        { type: 'Permission', id: 'LIST' }
      ],
    }),
    
    // Get permissions for a specific role
    getPermissionsByRoleId: builder.query<RolePermission[], number>({
      query: (roleId) => `/role-permissions?role_id=${roleId}`,
      transformResponse: (response: ApiResponse<RolePermission[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'RolePermission' as const, id })),
              { type: 'RolePermission', id: 'LIST' },
            ]
          : [{ type: 'RolePermission', id: 'LIST' }],
    }),
    
    // Get roles for a specific permission
    getRolesByPermissionId: builder.query<RolePermission[], number>({
      query: (permissionId) => `/role-permissions?permission_id=${permissionId}`,
      transformResponse: (response: ApiResponse<RolePermission[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'RolePermission' as const, id })),
              { type: 'RolePermission', id: 'LIST' },
            ]
          : [{ type: 'RolePermission', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRolePermissionsQuery,
  useAssignPermissionMutation,
  useRemovePermissionMutation,
  useGetPermissionsByRoleIdQuery,
  useGetRolesByPermissionIdQuery,
} = rolePermissionApi;