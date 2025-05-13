import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/utils';
import { ApiResponse } from '@/types/authTypes';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/userTypes';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      transformResponse: (response: ApiResponse<User[]>) => response.data!,
      providesTags: (result) => 
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Get a specific user by ID
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: ApiResponse<User>) => response.data!,
      providesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),

    // Create a new user
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data!,
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    // Update a user
    updateUser: builder.mutation<User, { id: number; userData: UpdateUserRequest }>({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data!,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),

    // Delete a user
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;