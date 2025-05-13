import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from '@/features/roles/rolesApi'; // Adjust the import path as needed
import { Role, CreateRoleRequest, UpdateRoleRequest } from '@/types/roleTypes'; // Adjust the import path as needed
import DeleteRoleConfirmationDialog from '@/components/roles/DeleteRoleConfirmation';

// --- Role Management Page Component ---
const RoleManagementPage: React.FC = () => {
    const { data: roles, isLoading, isError, refetch } = useGetRolesQuery();
    const [deleteRoleMutation] = useDeleteRoleMutation();
    const navigate = useNavigate();
  
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  
    const handleDeleteClick = (role: Role) => {
      setRoleToDelete(role);
      setIsDeleteDialogOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      if (roleToDelete) {
        try {
          await deleteRoleMutation(roleToDelete.id).unwrap();
          setIsDeleteDialogOpen(false);
          setRoleToDelete(null);
          // Optionally refetch the roles list after deletion
          refetch();
        } catch (error) {
          console.error('Failed to delete role:', error);
          // Handle error (e.g., show a notification)
        }
      }
    };
  
    const handleCancelDelete = () => {
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
    };
  
    if (isLoading) return <div className="text-center mt-8">Loading roles...</div>;
    if (isError) return <div className="text-center mt-8 text-red-600">Error loading roles.</div>;
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Role Management</h2>
  
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate('/roles/create')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create New Role
          </button>
        </div>
  
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles?.map((role) => (
                <tr key={role.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {role.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {role.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(role.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/roles/${role.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/roles/edit/${role.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(role)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {isDeleteDialogOpen && roleToDelete && (
          <DeleteRoleConfirmationDialog
            roleName={roleToDelete.name}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    );
  };

  export default RoleManagementPage;