import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/utils';
import { ApiResponse } from '@/types/authTypes';
import { CreateRoleRequest, Role, UpdateRoleRequest } from '@/types/roleTypes'


export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    // Get all roles
    getRoles: builder.query<Role[], void>({
      query: () => '/roles',
      transformResponse: (response: ApiResponse<Role[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Role' as const, id })),
              { type: 'Role', id: 'LIST' },
            ]
          : [{ type: 'Role', id: 'LIST' }],
    }),

    // Create a new role
    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: (roleData) => ({
        url: '/roles',
        method: 'POST',
        body: roleData,
      }),
      transformResponse: (response: ApiResponse<Role>) => response.data!,
      invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),

    // Update a role
    updateRole: builder.mutation<Role, { id: number; roleData: UpdateRoleRequest }>({
      query: ({ id, roleData }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: roleData,
      }),
      transformResponse: (response: ApiResponse<Role>) => response.data!,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Role', id }, { type: 'Role', id: 'LIST' }],
    }),

    // Delete a role
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Role', id }, { type: 'Role', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;