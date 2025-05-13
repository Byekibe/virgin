// types.ts
export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export interface TokenBlocklist {
  id: number;
  jti: string;
  token_type: string;
  user_id: number;
  revoked_at: string;
  expires_at: string;
}

export interface TokenInfo {
  id: number;
  jti: string;
  token_type: string;
  issued_at: string;
  expires_at: string;
  device_info?: string;
  ip_address?: string;
  last_used_at?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface ApiResponse<T = null> {
  status: string;
  message?: string;
  data?: T;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  reset_token: string;
  new_password: string;
}

export interface ApiResponse<T> {
  status: string;
  message?: string;
  data?: T;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetLinkResponse {
  status: string;
  message: string;
  reset_url: string;
}