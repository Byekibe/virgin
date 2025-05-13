// components/permissions/EditPermissionPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGetPermissionByIdQuery, useUpdatePermissionMutation } from '@/features/permissions/permissions'; // Adjust import path
import { UpdatePermissionRequest } from '@/types/permissionTypes'; // Adjust import path

const EditPermissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const permissionId = Number(id); // Convert ID to number

  const navigate = useNavigate();
  const { data: permission, error, isLoading } = useGetPermissionByIdQuery(permissionId);
  const [updatePermission, { isLoading: isUpdating, isError: isUpdateError, isSuccess: isUpdateSuccess, error: updateError }] = useUpdatePermissionMutation();

  const [formData, setFormData] = useState<UpdatePermissionRequest>({ name: '', description: '' });

  // Effect to populate form data when permission data is loaded
  useEffect(() => {
    if (permission) {
      setFormData({
        name: permission.name,
        description: permission.description || '', // Handle optional description
      });
    }
  }, [permission]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!permissionId) return; // Should not happen if route is set up correctly

    try {
      await updatePermission({ id: permissionId, permissionData: formData }).unwrap();
      // Optional: Show success message
      alert('Permission updated successfully!');
      navigate('/permissions'); // Navigate back to the list page
    } catch (err) {
      // Optional: Show error message
       console.error('Failed to update permission:', err);
      // const errorMessage = (err as any).data?.message || (err as any).error || 'An unknown error occurred';
      // alert(`Failed to update permission: ${errorMessage}`);
    }
  };

   const queryErrorMessage = error ? ((error as any).data?.message || (error as any).error || 'An unknown error occurred') : null;
   const mutationErrorMessage = isUpdateError ? ((updateError as any).data?.message || (updateError as any).error || 'An unknown error occurred') : null;


  if (isLoading) {
    return (
       <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Loading permission data...</p>
      </div>
    );
  }

  if (error) {
     return (
       <div className="container mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">Edit Permission</h1>
         <div className="text-red-500">Error loading permission: {queryErrorMessage}</div>
       </div>
     );
  }

   if (!permission) {
       // This case might happen if the ID is invalid after loading finishes
       return (
            <div className="container mx-auto p-6">
              <h1 className="text-2xl font-bold mb-6">Edit Permission</h1>
              <div className="text-red-500">Permission not found.</div>
            </div>
         );
   }


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Permission: {permission.name}</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Permission Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description (Optional):
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

         {mutationErrorMessage && (
          <div className="mb-4 text-red-500 text-sm">{mutationErrorMessage}</div>
        )}


        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Permission'}
          </button>
           <button
             type="button"
             onClick={() => navigate('/permissions')} // Adjust route path
             className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
             Cancel
          </button>
        </div>
         {isUpdateSuccess && <div className="mt-4 text-green-500 text-sm text-center">Permission updated!</div>}
      </form>
    </div>
  );
};

export default EditPermissionPage;