// components/permissions/PermissionManagementPage.tsx
import React from 'react';
import { Link } from 'react-router';
import { Edit, Eye, Trash2, PlusCircle } from 'lucide-react'; // Assuming lucide-react is installed
import { useGetPermissionsQuery, useDeletePermissionMutation } from '@/features/permissions/permissions'; // Adjust import path

const PermissionManagementPage: React.FC = () => {
  const { data: permissions, error, isLoading } = useGetPermissionsQuery();
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the permission "${name}"?`)) {
      try {
        await deletePermission(id).unwrap();
        // Optional: Show a success notification
        console.log(`Permission ${name} deleted successfully.`);
      } catch (err) {
        // Optional: Show an error notification
        console.error('Failed to delete permission:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading permissions...</p>
      </div>
    );
  }

  if (error) {
    // Assuming error has a message property, adjust if your error type is different
    const errorMessage = (error as any).data?.message || (error as any).error || 'An unknown error occurred';
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Permission Management</h1>
        <div className="text-red-500">Error loading permissions: {errorMessage}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permission Management</h1>
        <Link
          to="/permissions/create" // Adjust route path if needed
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Permission
        </Link>
      </div>

      {permissions && permissions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{permission.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{permission.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{permission.description || '-'}</td>
                   <td className="py-3 px-4 text-sm text-gray-700">
                     {new Date(permission.created_at).toLocaleDateString()}
                   </td>
                  <td className="py-3 px-4 text-center text-sm">
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`/permissions/view/${permission.id}`} // Adjust route path
                        className="text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/permissions/edit/${permission.id}`} // Adjust route path
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(permission.id, permission.name)}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No permissions found. Create one to get started!</p>
      )}
       {isDeleting && <div className="mt-4 text-sm text-center text-red-500">Deleting...</div>}
    </div>
  );
};

export default PermissionManagementPage;