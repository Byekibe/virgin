import { Permission } from "@/types/permissionTypes";
import { Role } from "@/types/roleTypes";

// Define RolePermission type based on your backend model
export interface RolePermission {
  id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  updated_at: string;
  // Optional populated relationships
  role?: Role;
  permission?: Permission;
}

// Define request types
export interface AssignPermissionRequest {
  role_id: number;
  permission_id: number;
}