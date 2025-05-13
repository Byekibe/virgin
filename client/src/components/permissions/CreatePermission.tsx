// components/permissions/CreatePermissionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreatePermissionMutation } from '@/features/permissions/permissions'; // Adjust import path
import { CreatePermissionRequest } from '@/types/permissionTypes'; // Adjust import path

const CreatePermissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatePermissionRequest>({ name: '', description: '' });
  const [createPermission, { isLoading, isError, isSuccess, error }] = useCreatePermissionMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Use unwrap() to get the actual result or throw an error
      await createPermission(formData).unwrap();
      // Optional: Show success message
      alert('Permission created successfully!');
      navigate('/permissions'); // Navigate back to the list page
    } catch (err) {
      // Optional: Show error message
      console.error('Failed to create permission:', err);
      // The error object from RTK Query can be complex, adjust how you display it
      // const errorMessage = (err as any).data?.message || (err as any).error || 'An unknown error occurred';
      // alert(`Failed to create permission: ${errorMessage}`);
    }
  };

  // Assuming error has a message property, adjust if your error type is different
  const errorMessage = isError ? ((error as any).data?.message || (error as any).error || 'An unknown error occurred') : null;


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Permission</h1>

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

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Permission'}
          </button>
          <button
             type="button"
             onClick={() => navigate('/permissions')} // Adjust route path
             className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
             Cancel
          </button>
        </div>
         {isSuccess && <div className="mt-4 text-green-500 text-sm text-center">Permission created!</div>}
      </form>
    </div>
  );
};

export default CreatePermissionPage;