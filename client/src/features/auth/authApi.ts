// authApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/utils/utils';
import { 
  User, ApiResponse, AuthResponse, 
  RegisterRequest, LoginRequest, 
  RefreshTokenRequest, ForgotPasswordRequest,
  ResetPasswordRequest, ResetLinkResponse
} from '@/types/authTypes';

// Define types for request and response objects


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Register a new user
    register: builder.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Login a user
    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Refresh access token
    refreshToken: builder.mutation<ApiResponse<AuthResponse>, RefreshTokenRequest>({
      query: (refreshToken) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: refreshToken,
      }),
    }),
    
    // Forgot password
    forgotPassword: builder.mutation<ApiResponse<null>, ForgotPasswordRequest>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: email,
      }),
    }),
    
    // Reset password
    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordRequest>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    
    // Validate reset token
    validateResetToken: builder.query<ResetLinkResponse, string>({
      query: (token) => `/auth/reset-password/${token}`,
    }),
    
    // Logout a user
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    
    // Get current user info
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
      transformResponse: (response: ApiResponse<User>) => response.data!,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useValidateResetTokenQuery,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;