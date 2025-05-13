// Define Permission type based on your backend model
export interface Permission {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

// Define request types
export interface CreatePermissionRequest {
  name: string;
  description?: string;
}

export interface UpdatePermissionRequest {
  name?: string;
  description?: string;
}