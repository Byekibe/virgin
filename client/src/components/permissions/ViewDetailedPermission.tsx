// components/permissions/ViewPermissionPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router';
import { useGetPermissionByIdQuery } from '@/features/permissions/permissions'; // Adjust import path

const ViewPermissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const permissionId = Number(id); // Convert ID to number

  const { data: permission, error, isLoading } = useGetPermissionByIdQuery(permissionId);

  if (isLoading) {
    return (
       <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading permission details...</p>
      </div>
    );
  }

  if (error) {
     const errorMessage = (error as any).data?.message || (error as any).error || 'An unknown error occurred';
     return (
       <div className="container mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">View Permission Details</h1>
         <div className="text-red-500">Error loading permission: {errorMessage}</div>
       </div>
     );
  }

  if (!permission) {
    return (
       <div className="container mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">View Permission Details</h1>
         <div className="text-red-500">Permission not found.</div>
       </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Permission Details: {permission.name}</h1>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">ID:</p>
          <p className="text-gray-900 text-base">{permission.id}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Name:</p>
          <p className="text-gray-900 text-base">{permission.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Description:</p>
          <p className="text-gray-900 text-base">{permission.description || '-'}</p>
        </div>
        <div className="mb-6">
          <p className="text-gray-700 text-sm font-bold mb-1">Created At:</p>
          <p className="text-gray-900 text-base">
             {new Date(permission.created_at).toLocaleString()} {/* Or toDateString() */}
          </p>
        </div>

        <div className="flex justify-center">
           <Link
             to={`/permissions/edit/${permission.id}`} // Adjust route path
             className="mr-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
             Edit Permission
           </Link>
          <Link
            to="/permissions" // Adjust route path
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 py-2 px-4"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewPermissionPage;