import { User } from '@/types/userTypes';
import { Role } from '@/types/roleTypes';

export interface UserRole {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
  // Optional populated relationships
  user?: User;
  role?: Role;
}

// Define request types
export interface AssignRoleRequest {
  user_id: number;
  role_id: number;
}