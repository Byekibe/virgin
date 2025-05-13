// Define Role type based on your backend model
export interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

// Define request types
export interface CreateRoleRequest {
  name: string;
  description?: string;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
}