import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/utils';
import { ApiResponse } from '@/types/authTypes';
import { CreatePermissionRequest, Permission, UpdatePermissionRequest,  } from "@/types/permissionTypes"

export const permissionApi = createApi({
  reducerPath: 'permissionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Permission'],
  endpoints: (builder) => ({
    // Get all permissions
    getPermissions: builder.query<Permission[], void>({
      query: () => '/permissions',
      transformResponse: (response: ApiResponse<Permission[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Permission' as const, id })),
              { type: 'Permission', id: 'LIST' },
            ]
          : [{ type: 'Permission', id: 'LIST' }],
    }),

    // Get permission by ID
    getPermissionById: builder.query<Permission, number>({
      query: (id) => `/permissions/${id}`,
      transformResponse: (response: ApiResponse<Permission>) => response.data!,
      providesTags: (_result, _error, id) => [{ type: 'Permission', id }],
    }),

    // Create a new permission
    createPermission: builder.mutation<Permission, CreatePermissionRequest>({
      query: (permissionData) => ({
        url: '/permissions',
        method: 'POST',
        body: permissionData,
      }),
      transformResponse: (response: ApiResponse<Permission>) => response.data!,
      invalidatesTags: [{ type: 'Permission', id: 'LIST' }],
    }),

    // Update a permission
    updatePermission: builder.mutation<Permission, { id: number; permissionData: UpdatePermissionRequest }>({
      query: ({ id, permissionData }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        body: permissionData,
      }),
      transformResponse: (response: ApiResponse<Permission>) => response.data!,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Permission', id }, { type: 'Permission', id: 'LIST' }],
    }),

    // Delete a permission
    deletePermission: builder.mutation<void, number>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Permission', id }, { type: 'Permission', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useGetPermissionByIdQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionApi;